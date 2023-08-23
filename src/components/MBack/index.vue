<template>
  <div class="back-icon" @click="goBack">
    <van-icon name="arrow-left" />
    <span> 返回</span>
  </div>
</template>

<script lang="ts">
export default { name: 'MBack' }
</script>
<script setup lang="ts">
const goBack = (): void => {
  useVueRouter.routerBackMixin()
}
</script>

<style lang="scss" scoped>
.back-icon {
  color: #007aff;
  font-size: 16px;
  display: flex;
  align-items: center;
}
</style>
