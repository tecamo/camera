<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { parseQueryString } from "./func/parseQueryString.js";
import { generateBody } from "./func/postToGetToken.js";
import { uploadFile } from "./func/uploadFile.js";

const stream = ref(null)
const constraints = {
  audio: false,
  video: {
    facingMode: 'environment'
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
      if (accessToken != undefined)
      {
        setTimeout(() => postToGetToken(client_id, client_secret, refresh_token), json.expires_in * 1000);
      }
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
  <canvas ref="canvas" id="canvas"></canvas>
  <div class="camera-background">
        <div class="lens-big-wrapper">
            <div class="lens-big">
              <video :srcObject="stream" ref="video" id="video" autoplay muted playsinline></video>
            </div>
            <div class="lens-small-outer">
              <video :srcObject="stream" class="lens-small-inner" ref="video" id="video" autoplay muted playsinline></video>
            </div>
        </div>
        <div class="tool-bar-wrapper">
            <div class="tool-bar-right">
                <div class="photos-left-counter">
                  <div v-if="loading" class="spinner">
                    <div class="spinner-inner"></div>
                  </div>
                  <div v-else="loading">
                    {{ count }}
                  </div>
                </div>
                <div class="button-shutter">
                    <div class="button-shutter-inner" @click.native="takePictureAndUpload"></div>
                </div>
                <div class="app-logo">
                    Camote
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@media only screen and (max-width: 550px) {
  #app{
    transform: rotate(90deg);
  }
}
#canvas {
  display: none;
}
.camera-background {
  /* Gradient */
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(270deg, rgba(0, 71, 255, 0.5176470588) 0%, rgba(237, 237, 237, 0) 50.44%, rgba(0, 51, 184, 0.6588235294) 100.88%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.camera-background .lens-big-wrapper {
  border: 8px solid #000000;
  border-radius: 50%;
  height: 115vh;
  width: 115vh;
  transform: translate(-16%, -8%);
  position: relative;
  z-index: 1;
}
.camera-background .lens-big-wrapper .lens-big {
  border-radius: inherit;
  filter: contrast(15%) brightness(160%);
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow: hidden;
}
.camera-background .lens-big-wrapper .lens-small-outer {
  height: 42vh;
  width: 58vh;
  transform: translate(40vw, -100vh);
  background: linear-gradient(238.31deg, rgb(0, 34, 168) 6%, rgb(221, 0, 255) 100%);
  border: 3px solid black;
  border-radius: 51% 51% 37% 37%/100% 100% 50% 50%;
  z-index: 1;
  position: absolute;
}
.camera-background .lens-big-wrapper .lens-small-outer .lens-small-inner {
  background-color: #041350;
  border: 4px solid #041350;
  border-radius: 35px;
  height: 75%;
  width: 75%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 20%);
}
.camera-background .tool-bar-wrapper {
  background: linear-gradient(180deg, #000B43 0%, rgba(63, 8, 117, 0) 100%);
  -webkit-clip-path: polygon(100% 100%, 14% 100%, 0% 82%, 29% 12%, 15% 0%, 100% 0%);
          clip-path: polygon(100% 100%, 14% 100%, 0% 82%, 29% 12%, 15% 0%, 100% 0%);
  height: 100vh;
  width: 12rem;
}
.camera-background .tool-bar-wrapper .tool-bar-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: calc(100% - 6em);
  margin: 3em 0;
}
.camera-background .tool-bar-wrapper .tool-bar-right div {
  font-family: "Mina";
  display: flex;
  justify-content: center;
  align-items: center;
}
.camera-background .tool-bar-wrapper .tool-bar-right .photos-left-counter {
  background-color: black;
  text-align: center;
  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
.camera-background .tool-bar-wrapper .tool-bar-right .photos-left-counter .spinner {
  background-color: transparent;
  display: inline-block;
  position: relative;
  width: 100%;
  height: 40px;
}
.camera-background .tool-bar-wrapper .tool-bar-right .photos-left-counter .spinner .spinner-inner {
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
  border-top-color: #ffffff;
  animation: spinner-animation 1.2s linear infinite;
}
.camera-background .tool-bar-wrapper .tool-bar-right .button-shutter {
  border-radius: 50%;
  border: 5px solid black;
  width: 6rem;
  height: 6rem;
  background-color: #ffffff;
}
.camera-background .tool-bar-wrapper .tool-bar-right .app-logo {
  background-color: transparent;
  color: #000000;
  font-size: 35px;
  line-height: 32px;
}
.camera-background .tool-bar-wrapper .tool-bar-right .button-shutter .button-shutter-inner {
  border-radius: 50%;
  width: 95%;
  height: 95%;
  background-color: black;
}
.camera-background .tool-bar-wrapper .tool-bar-right .button-switch-camera-bg {
  background: url(switch-camera.png) no-repeat;
  background-size: cover;
  background-color: transparent;
  width: 3.5rem;
  height: 3.5rem;
}
.camera-background .tool-bar-wrapper .tool-bar-right .button-switch-camera-bg .button-switch-camera {
  display: none;
  background-color: white;
  width: 50%;
  height: 50%;
  z-index: -1;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
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

@keyframes spinner-animation {
  to {transform: rotate(360deg);}
}

</style>