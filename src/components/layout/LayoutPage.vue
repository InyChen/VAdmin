<template>
  <div class="grid-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LayoutPage"
}
</script>

<style scoped>
.grid-page {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
}
</style>
