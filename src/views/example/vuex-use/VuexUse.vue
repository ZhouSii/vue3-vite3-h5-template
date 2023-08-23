<template>
  <div>
    <div>getter</div>
    <van-button @click="getterFunc">获取getter:{{ getterValue }}</van-button>
    <div class="mt-2">commit</div>
    <van-button @click="c_openSideBar">c_openSideBar</van-button>
    <van-button @click="c_closeSideBar">c_closeSideBar</van-button>
    <div class="mt-2">action</div>
    <van-button @click="openSideBar">openSideBar</van-button>
    <van-button @click="closeSideBar">closeSideBar</van-button>
    <div>是否开启：{{ opened }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store/'
/*getter*/
const getterValue = ref(null)

const appStore = useAppStore()
const getterFunc = () => {
  getterValue.value = appStore.cachedViews
}

console.log('appStore:', appStore.test)

const opened = computed(() => appStore.test)

/*mutations*/
/*建议commit用M_开头 action用A_开头*/
const c_openSideBar = () => {
  appStore.M_vuex_test(true)
}
const c_closeSideBar = () => {
  appStore.M_vuex_test(false)
}
/*actions*/
const openSideBar = () => {
  appStore.M_vuex_test(true)
}
const closeSideBar = () => {
  appStore.M_vuex_test(false)
}
</script>

<style scoped lang="scss"></style>
