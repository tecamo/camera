<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
  vWidth: {
    type: String,
    default: "100%"
  },
  isMasked: Boolean,
});
const svgWidth = props.vWidth;
const svgHeight = `calc(0.7899 * ${svgWidth})`;
const stream = ref(null);
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
</script>

<template>
  <div class="lense-container" :style="{ width: svgWidth, height: svgHeight }">
    <svg :height="svgHeight" :width="svgWidth" viewBox="0 0 238 188" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.9825 16.3722C32.7905 13.5155 37.3756 11.045 43.3488 8.96276C49.3119 6.88406 56.6117 5.20816 64.8033 3.91349C81.1856 1.32429 101.087 0.267261 120.893 0.541053C140.698 0.814837 160.39 2.4191 176.353 5.14571C184.335 6.50913 191.374 8.15137 197.023 10.0438C202.688 11.9414 206.898 14.0719 209.278 16.3805C211.678 18.7091 214.088 22.4704 216.433 27.3569C218.775 32.2353 221.035 38.2009 223.148 44.9079C227.375 58.3213 231.004 74.6669 233.52 91.1402C236.036 107.614 237.435 124.199 237.209 138.092C237.096 145.039 236.576 151.302 235.591 156.535C234.604 161.778 233.156 165.946 231.215 168.736C230.278 170.083 228.647 171.398 226.353 172.659C224.065 173.918 221.154 175.105 217.7 176.216C210.793 178.436 201.762 180.334 191.31 181.886C170.41 184.991 143.888 186.709 117.435 186.897C90.9814 187.084 64.6179 185.741 44.0342 182.73C33.7403 181.224 24.9107 179.304 18.244 176.958C14.9106 175.785 12.133 174.511 9.98801 173.138C7.83905 171.762 6.35756 170.309 5.56953 168.791C2.25355 162.405 0.650673 151.167 0.510164 137.446C0.369929 123.752 1.68584 107.671 4.14523 91.66C6.60463 75.6494 10.2053 59.7244 14.629 46.3426C19.0595 32.9402 24.2932 22.1601 29.9825 16.3722Z" fill="url(#paint0_linear_376_1068)" fill-opacity="0.51" stroke="#203A93"/>
      <defs>
        <linearGradient id="paint0_linear_376_1068" x1="17.126" y1="-5.9784" x2="261.126" y2="152.522" gradientUnits="userSpaceOnUse">
          <stop offset="0.0360339" stop-color="#AE0A0A"/>
          <stop offset="1" stop-color="#DB00FF" stop-opacity="0.17"/>
        </linearGradient>
      </defs>
    </svg>
    
    <svg :height="svgHeight" :width="svgWidth" viewBox="0 0 238 188" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.9825 16.3736C32.7905 13.517 37.3756 11.0464 43.3488 8.96423C49.3119 6.88553 56.6117 5.20962 64.8033 3.91495C81.1856 1.32576 101.087 0.268726 120.893 0.542518C140.698 0.816302 160.39 2.42057 176.353 5.14718C184.335 6.51059 191.374 8.15283 197.023 10.0453C202.688 11.9429 206.898 14.0734 209.278 16.3819C211.678 18.7106 214.088 22.4718 216.433 27.3583C218.775 32.2368 221.035 38.2024 223.148 44.9093C227.375 58.3228 231.004 74.6684 233.52 91.1416C236.036 107.616 237.435 124.201 237.209 138.094C237.096 145.04 236.576 151.303 235.591 156.537C234.604 161.78 233.156 165.947 231.215 168.738C230.278 170.085 228.647 171.399 226.353 172.661C224.065 173.919 221.154 175.107 217.7 176.217C210.793 178.438 201.762 180.335 191.31 181.888C170.41 184.993 143.888 186.711 117.435 186.898C90.9814 187.085 64.6179 185.742 44.0342 182.731C33.7403 181.226 24.9107 179.306 18.244 176.96C14.9106 175.787 12.133 174.512 9.98801 173.139C7.83905 171.764 6.35756 170.31 5.56953 168.793C2.25355 162.406 0.650673 151.168 0.510164 137.448C0.369929 123.754 1.68584 107.672 4.14523 91.6615C6.60463 75.6509 10.2053 59.7258 14.629 46.3441C19.0595 32.9417 24.2932 22.1616 29.9825 16.3736Z" fill="url(#paint0_linear_376_1069)" fill-opacity="0.51" stroke="#203A93"/>
      <defs>
        <linearGradient id="paint0_linear_376_1069" x1="231.126" y1="0.0230838" x2="-1.87403" y2="182.523" gradientUnits="userSpaceOnUse">
          <stop offset="0.618863" stop-color="#0023A8"/>
          <stop offset="1" stop-color="#DB00FF" stop-opacity="0.17"/>
        </linearGradient>
      </defs>
    </svg>
    
    <svg :height="svgHeight" :width="svgWidth" viewBox="0 0 238 188" fill="none" fill-opacity="0" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.3391 16.7241C33.0676 13.9483 37.5676 11.509 43.5134 9.43636C49.439 7.37074 56.7074 5.7007 64.8814 4.40882C81.2275 1.82534 101.099 0.768939 120.886 1.04247C140.672 1.31598 160.337 2.91875 176.269 5.64004C184.236 7.0009 191.248 8.63787 196.865 10.5194C202.512 12.4112 206.633 14.5131 208.93 16.7408C211.267 19.0087 213.647 22.7079 215.983 27.5747C218.311 32.4252 220.563 38.3671 222.672 45.0596C226.889 58.4436 230.513 74.7634 233.026 91.2171C235.538 107.672 236.935 124.228 236.709 138.085C236.596 145.015 236.078 151.247 235.1 156.444C234.117 161.66 232.687 165.747 230.805 168.452C229.93 169.709 228.374 170.978 226.112 172.223C223.862 173.461 220.983 174.636 217.547 175.741C210.676 177.95 201.675 179.843 191.237 181.393C170.366 184.494 143.868 186.211 117.431 186.398C90.9931 186.585 64.6568 185.243 44.1066 182.237C33.8273 180.733 25.0334 178.819 18.41 176.488C15.0983 175.323 12.3592 174.063 10.2575 172.718C8.148 171.368 6.74558 169.973 6.01328 168.562C2.75636 162.29 1.15059 151.157 1.01014 137.443C0.870238 123.781 2.18322 107.727 4.63944 91.7374C7.09566 75.7474 10.6907 59.8505 15.1037 46.501C19.5304 33.1103 24.7353 22.4251 30.3391 16.7241Z" fill="white" stroke="#203A93" stroke-width="2"/>
    </svg>

    <div :class="['video-container', { 'masked-element': isMasked }]">
      <video :srcObject="stream" ref="video" id="video" autoplay muted playsinline></video>
      <!-- <video :srcObject="stream" class="lens-small-inner" ref="video" id="video" autoplay muted playsinline></video> -->
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 550px) {
  .video-container #video {
    transform: scale(1.8, 1.8) rotate(270deg);
  }
}

.lense-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
}

.lense-container svg {
  position: absolute;
  z-index: -1;
}

.video-container {
  width: 60%;
  height: 60%;
  border: 4px solid #041350;
  border-radius: 35px;
  z-index: 1;
  overflow: hidden;
  display: flex;
  /* display: none; */
}

video {
  width: 103%;
  z-index: -1;
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
  background-color: rgba(255, 255, 255, 0.865);
}
</style>
