<template>
  <div class="outer-circle" @click="$emit('shutter-click')">
    <div class="inner-circle"></div>
  </div>
</template>

<style scoped>
.outer-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.5rem;
  height: 6.5rem;
  background-color: white;
  border: 0.4rem solid #000000;
  border-radius: 50%;
}

.inner-circle {
  width: 95%;
  height: 95%;
  background-color: #000000;
  border-radius: 50%;
}
.inner-circle:active {
  transform: scale(0.95);
}
</style>
