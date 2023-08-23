<template>
  <div id="elong-st-ele" class="m-scroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default { name: 'MScroll' }
</script>

<style lang="scss" scoped>
.m-scroll {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
