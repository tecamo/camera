<script setup>
import RoundCounter from './RoundCounter.vue';
import ShutterButton from './ShutterButton.vue';
import AppName from './AppName.vue';

const props = defineProps({
  vHeight: {
    type: String,
    // default: "100vh"
    default: "100%"
  },
  count: Number,
  isLoading: Boolean,
});

const svgHeight = props.vHeight;
// const svgWidth = `calc(0.68 * ${svgHeight})`;
const svgWidth = `300px`;
</script>

<template>
  <div class="sidebar" :style="{ width: svgWidth, height: svgHeight }">

    <svg class="overlay-svg-1" :height="svgHeight" :width="svgWidth" preserveAspectRatio="none" viewBox="0 0 155 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.0046 0C91.5049 37.9996 -41.9954 257.5 14.0048 320H155.005V0H40.0046Z" fill="url(#paint0_linear_360_1059)"/>
      <defs>
        <linearGradient id="paint0_linear_360_1059" x1="77.5023" y1="0" x2="77.5023" y2="320" gradientUnits="userSpaceOnUse">
          <stop stop-color="#000B43"/>
          <stop offset="1" stop-color="#3F0875" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>

    <!-- <svg class="overlay-svg-2" :height="svgHeight" width="100%" preserveAspectRatio="none" viewBox="0 0 155 320" fill="none" xmlns="http://www.w3.org/2000/svg">  --> <!-- Denna blev ganska snygg också -->
    <svg class="overlay-svg-2" :height="svgHeight" :width="svgWidth" preserveAspectRatio="none" viewBox="0 0 155 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.0046 0C91.5049 37.9996 -41.9954 257.5 14.0048 320H155.005V0H40.0046Z" fill="url(#paint0_linear_360_1059)"/>
      <defs>
        <linearGradient id="paint0_linear_360_1059" x1="77.5023" y1="0" x2="77.5023" y2="320" gradientUnits="userSpaceOnUse">
          <stop stop-color="#000B43"/>
          <stop offset="1" stop-color="#3F0875" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>

    <div class="components-container">
      <RoundCounter id="round-counter" :count="count" :is-loading="isLoading"/>
      <ShutterButton @shutter-click="$emit('shutter-click')"></ShutterButton>
      <AppName id="app-name"  name="Camote"/>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: relative;
  z-index: 1;
}

.overlay-svg-1 {
  position: absolute;
  top: 0;
  z-index: -1;
}

.overlay-svg-2 {
  position: absolute;
  top: 0;
  left: 0.30rem;
  z-index: -1;
}

.components-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 1rem;
  padding-left: 28%;
}
</style>
