<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { parseQueryString } from "./func/parseQueryString.js";
import { generateBody } from "./func/postToGetToken.js";
import { uploadFile } from "./func/uploadFile.js";

import Sidebar from './components/Sidebar.vue';
import SmallLense from './components/SmallLense.vue';
import BigLense from './components/BigLense.vue';


const canvas = ref(null);
const count = ref(4);
const isLoading = ref(false);
const isMasked = ref(false);

// Set up stream:
const stream = ref(null)
const constraints = {
  audio: false,
  video: {
    width: { ideal: 4096 },
    height: { ideal: 2160 },
    facingMode: 'environment'
  },
}
onMounted(async () => {
  stream.value = await navigator.mediaDevices.getUserMedia(constraints);
})
onBeforeUnmount(() => {
  stream.value.getTracks().forEach(track => track.stop())
})

// Set up reference to video element in SmallLense.vue component:
const smallLenseComponent = ref(null);
const video = ref(null);
onMounted(() => {
  smallLenseComponent.value.$refs.video.addEventListener('loadedmetadata', () => {
    video.value = smallLenseComponent.value.$refs.video;
  });
});

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

  isLoading.value = true;
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
    await uploadFile(blob, folder_id, "photo", accessToken, isLoading);
  });
}
</script>

<template>
  <div class="bg">
    <div class="lenses-container">
      <div class="big-lense-container">
        <BigLense/>
      </div>

      <div class="small-lense-container">
        <SmallLense ref="smallLenseComponent" :is-masked="isMasked"/>
      </div>
    </div>

    <Sidebar :count="count" :is-loading="isLoading" @shutter-click="takePictureAndUpload"></Sidebar>

  </div>
  <canvas ref="canvas" id="canvas"> </canvas>
</template>

<style>
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

  .round-counter, .app-name {
    transform: rotate(-90deg);
  }
}

@media only screen and (min-width: 551px)
{
  #app{
    height:100vh;
    width:100vw;
  }
}

.bg {
  background: linear-gradient(270deg, rgba(0, 71, 255, 0.515625) 0%, rgba(237, 237, 237, 0) 50.44%, rgba(0, 51, 184, 0.66) 100.88%);
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.lenses-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.big-lense-container {
  position: absolute;
  aspect-ratio: 1 / 1;
  height: 120%;
  transform: translate(-10%, -9%);
}

.small-lense-container {
  position: absolute;
  margin-left: 10rem;
  aspect-ratio: 1 / 1;
  width: 74%;
}

#canvas {
  display: none;
}
</style>