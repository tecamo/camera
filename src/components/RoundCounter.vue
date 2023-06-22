<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 5
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="round-counter">
    <div v-if="isLoading" class="spinner">
      <div class="spinner-inner"/>
    </div>
    <div v-else="isLoading">
      {{ count }}
    </div>
  </div>
</template>

<style scoped>
.round-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Mina";
  padding: 1rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin-left: 0.7rem;
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
