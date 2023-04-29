<script setup>

</script>

<template>
    <button class="button-side">
        <span class="button-top"></span>
    </button>
</template>

<style scoped>  

.button-side {
    /* width: 70px;
    height: 70px; */
    border: 0;
    background: hsl(40deg 100% 32%);
    border-radius: 50%;
}
.button-top {
    display: block;
    /* width: 70px;
    height: 70px; */
    border-radius: 50%;
    background: hsl(45deg 100% 47%);
    color: white;
    scale: 0.9;
}

.button-top:active {
    transform: scale(0.95);
}
</style>
