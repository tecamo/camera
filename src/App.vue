<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PushButton from "./components/PushButton.vue";
import { parseQueryString } from "./func/parseQueryString.js";
import { generateBody } from "./func/postToGetToken.js";
import { uploadFile } from "./func/uploadFile.js";

const stream = ref(null)
const constraints = {
  audio: false,
  video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 } 
  },
}

onMounted(async () => {
  stream.value = await navigator.mediaDevices.getUserMedia(constraints);
})

onBeforeUnmount(() => {
  stream.value.getTracks().forEach(track => track.stop())
})

const canvas = ref(null);
const video = ref(null);
const count = ref(3);
const loading = ref(false);
const isMasked = ref(false);

let { client_id, client_secret, refresh_token, folder_id } = parseQueryString();

let accessToken;
postToGetToken(client_id, client_secret, refresh_token);

function postToGetToken(client_id, client_secret, refresh_token) {
    var formBody = generateBody(client_id, client_secret, refresh_token);

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
      setTimeout(() => postToGetToken(client_id, client_secret, refresh_token), json.expires_in*1000);
    });
}

function takePictureAndUpload() {
  if (count.value <= 0) {
    return;
  }
  count.value--;

  loading.value = true;
  isMasked.value = true;
  setTimeout(() => {
    isMasked.value = false;
  }, 100);

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
  
  canvas.value.toBlob(async (blob) => {
    await uploadFile(blob, folder_id, "photo", accessToken, loading);
  });
}
</script>

<template>
  <div class="camera">
    <!-- <div class="camera-lens masked-element"> -->
      <div :class="['camera-lens', { 'masked-element': isMasked }]">
      
      <video :srcObject="stream" ref="video" id="video" autoplay></video>
    </div>
    <div class="push-button-container">
      <PushButton @click.native="takePictureAndUpload" class="push-button" />
    </div>
    <div class="canvas-container">
      <canvas ref="canvas" id="canvas"> </canvas>
      <div class="counter">
        <h1>{{ count }} left</h1>
        <div v-if="loading" class="spinner">
          <div class="spinner-inner"></div>
        </div>
        <h1 v-else="loading">✓</h1>
      </div>
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
}

#canvas {
  display: none;
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

.masked-element {
  position: relative;
  z-index: 1;
}

.masked-element::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.585);
}

.push-button-container {
  margin-left: 80%;
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
  color: black;
}

.spinner {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 40px;
}

.spinner-inner {
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
  border: 3px solid #000000;
  border-top-color: #b2b2b2b9;
  animation: spinner-animation 1.2s linear infinite;
}

@keyframes spinner-animation {
  to {transform: rotate(360deg);}
}

</style>