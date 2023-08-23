<template>
  <div class="m-page bg-custom-bg">
    <div class="folder-header">
      <slot name="header"></slot>
      <div class="range"></div>
    </div>
    <div class="folder-content">
      <!-- <m-scroll> -->
      <slot name="content"></slot>
      <!-- </m-scroll> -->
    </div>
    <div v-if="slotFooter" class="folder-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'MPage' }
</script>
<script setup lang="ts">
//插槽信息
const slotFooter = !!useSlots().footer
</script>

<style lang="scss">
.m-page {
  .folder-header {
    .header-title {
      font-size: 18px;
      line-height: 25px;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      .more {
        font-size: 12px;
        font-weight: 500;
        width: 30px;
        text-align: right;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.m-page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .folder-header {
    position: relative;
    padding: 25px 15px 10px;
    background: linear-gradient(
      180deg,
      rgba(1, 83, 84, 1) 0%,
      rgba(2, 117, 113, 1) 61.81%,
      rgba(5, 182, 171, 1) 100%
    );
    color: #fff;
    .range {
      position: absolute;
      bottom: -40px;
      left: 0;
      right: 0;
      height: 40px;
      background: rgba(5, 182, 171, 1);
    }
  }
  .folder-content {
    flex: 1;
    padding: 0 15px 10px;
    overflow-x: hidden;
    position: relative;
  }

  .folder-footer {
    background: #fff;
    padding: 10px 20px 30px;
    border-top: 1px solid rgb(237, 240, 247);
  }
}
</style>
