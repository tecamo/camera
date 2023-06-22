<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// const props = defineProps({
//   height: {
//     type: String,
//     default: "100%"
//   },
//   stickingOut: {
//     type: String,
//     default: "10%"
//   }
// });

// const size = `calc(${props.height} + ${props.stickingOut})`;
// const translateVal = `calc(${props.stickingOut} / -2)`;
// const translateCss = `translate(${translateVal}, ${translateVal})`

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
</script>

<template>
  <div class="lens-big-container">
    <div class="lens-big">
      <video :srcObject="stream" class="lens-small-inner" ref="video" id="video" autoplay muted playsinline></video>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 550px) {
  .lens-big #video {
    transform: scale(1.8, 1.8) rotate(270deg);
  }
}

.lens-big-container {
  border: 0.5rem solid #000000;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  height: 100%;
}
.lens-big-container .lens-big {
  background-color: white;
  border-radius: inherit;
  filter: contrast(15%) brightness(160%);
  aspect-ratio: 1 / 1;
  height: 100%;
  overflow: hidden;
}
</style>
