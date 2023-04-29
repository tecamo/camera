<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PushButton from "./components/PushButton.vue";

const stream = ref(null)
const constraints = {
  audio: false,
  video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 } 
  },
}

onMounted(async () => {
  stream.value = await navigator.mediaDevices.getUserMedia(constraints)
})

onBeforeUnmount(() => {
  stream.value.getTracks().forEach(track => track.stop())
})

const canvas = ref(null);
const video = ref(null);
const count = ref(3)
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let accessToken;
let expires_in;
initAccessTokenAndExpiresIn();

function initAccessTokenAndExpiresIn() {
  var details = getRequestDetails();
  var formBody = [];
  for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  // fetch('https://accounts.google.com/o/oauth2/token', {
  fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  .then(response => response.json())
  .then(json => {
      accessToken = json.access_token;
      expires_in = json.expires_in;
      console.log(accessToken);
      console.log(expires_in);
  });
}

function getRequestDetails() {
  return {
      "client_id": params.client_id,
      "client_secret": params.client_secret,
      "grant_type":"refresh_token",
      "refresh_token": params.refresh_token,
  };
}

// count = 3;
function takePictureAndUpload() {
  if (count.value <= 0) {
    return;
  }
  count.value--;

  var context = canvas.value.getContext('2d');
  let stream_settings = stream.value.getVideoTracks()[0].getSettings();
  
  // actual width & height of the camera video
  let stream_width = stream_settings.width;
  let stream_height = stream_settings.height;
  console.log('Width: ' + stream_width + 'px');
  console.log('Height: ' + stream_height + 'px');

  canvas.value.width = stream_width;
  canvas.value.height = stream_height;
  context.drawImage(video.value, 0, 0, stream_width, stream_height);  
  
  // data = canvas.value.toDataURL('image/png');
  // photo.value.setAttribute('src', data);

  canvas.value.toBlob((blob) => {
    uploadFile(blob);
  });
}

function uploadFile(blob) {
  // const file = document.getElementById("file-upload");
  const file = blob;
  let contentType = "image/png";
  // Load file and upload it
  if (contentType) {
    const reader = new FileReader();

    const boundary = 'part-divider';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    reader.addEventListener("load", async (event) => {
      const bytes = event.target.result;

      var fileMetadata = {
        'name': "some-file",
        "parents": ["1Y7CNMQQnzu_jtzcbbsy0wWlT8KJnI3gs"]
      };

      var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(fileMetadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        bytes +
        close_delim;
      
      let response = await fetch(
      // `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`,
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,
      {
          method: "POST",
          headers: {
              "Content-Type": contentType,
              // "Content-Type": "multipart/related; boundary="+delimiter, 
              Authorization: `Bearer ${accessToken}`,
          },
          body: bytes,
          // body: multipartRequestBody,
      }
      );
      console.log(response);
      if (response.ok) {
        alert(`Photo was sent! :)`);
        
      } else {
        alert(`Photo was not sent! :(`);
      }
    });
    
    reader.readAsArrayBuffer(file);
  }
};
</script>

<template>
  <div class="camera">
    <div class="camera-lens">
      <video :srcObject="stream" ref="video" id="video" autoplay></video>
    </div>
    <div class="push-button-container">
      <PushButton @click.native="takePictureAndUpload" class="push-button" />
    </div>
    <div class="canvas-container">
      <canvas ref="canvas" id="canvas"> </canvas>
      <div class="counter">
        <h1>{{ count }} photos left</h1>
      </div>
      <!-- <div class="output">
        <img ref="photo" id="photo" alt="The screen capture will appear here." />
      </div> -->
    </div>
  </div>
</template>

<!-- To remove all css when developing (but keeps the button a clickable size) -->
<!-- <style>
.push-button {
  width: 100px;
  height: 100px;
}
</style> -->

<style>
* {
  height: 100%;
  width: 100%;
  padding: 0%;
  overflow: hidden;
}

@media only screen and (max-width: 550px) {
  #app{
    transform: rotate(90deg);
    transform-origin:bottom left;
    
    position:absolute;
    top:-100vw;
    
    height:100vw;
    width:100vh;
  }

  .camera-lens #video {
    transform: scale(1.8, 1.8) rotate(270deg);
  }

  #canvas {
    display: none;
  }
}

#app {
  background: url('assets/camera-background.svg');
  background-size: 100% auto;
  background-repeat: no-repeat;
}

.camera-lens {
  border: 5px solid rgb(34, 34, 34);
  background-color: black;
  width: 30%;
  height: 30%;
  margin: auto;
  padding: 1%;
}

.push-button-container {
  margin-left: 85%;
  height: auto;
}

.push-button {
  width: 100px;
  height: 100px;
}

.canvas-container {
  height: auto;
  /* display: none; */
}

.output {
  width: 17%;
  height: 17%;
  margin: auto;
}

.counter {
  width: 17%;
  height: 17%;
  margin: auto;
}

.counter h1 {
  text-align: center;
}

</style>