<script setup>
  const props = defineProps({
    name: String
  });
</script>

<template>
  <div class="app-name">
    {{ name }}
  </div>
</template>

<style scoped>
.app-name {
  background-color: transparent;
  color: #000000;
  font-size: 28px;
  line-height: 32px;
  font-family: "Mina";
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
