<template>
  <router-view v-slot="{ Component }">
    <!-- <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cachedViews"> -->
    <component :is="Component" :key="key" />
    <!-- </keep-alive>
    </transition> -->
  </router-view>

  <van-watermark :content="watermarkText" :width="140" opacity="0.3" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/'
import { getUserInfo } from '@/utils/auth'
import { isEmptyObject } from '@/utils/is'
import eventBus from '@/utils/bus'

const route = useRoute()
const watermarkText = ref('E店通')
// app store
const appStore = useAppStore()
// cachePage: is true, keep-alive this Page
// leaveRmCachePage: is true, keep-alive remote when page leave
let oldRoute = null
const key = computed({
  get() {
    //setting title
    if (route.meta && route.meta.title) {
      document.title = route.meta.title
    }

    if (oldRoute?.name) {
      if (oldRoute.meta?.leaveRmCachePage && oldRoute.meta?.cachePage) {
        appStore.M_DEL_CACHED_VIEW(oldRoute.name)
      }
    }
    if (route.name) {
      if (route.meta?.cachePage) {
        appStore.M_ADD_CACHED_VIEW(route.name)
      }
    }
    oldRoute = JSON.parse(JSON.stringify({ name: route.name, meta: route.meta }))
    return route.path
  },
})

const cachedViews = computed(() => {
  return appStore.cachedViews
})

eventBus.on('setWatermark', () => {
  // 设置水印内容
  const userInfo = getUserInfo()
  watermarkText.value = isEmptyObject(userInfo) ? 'E店通' : `${userInfo.userName}`
})
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  /*margin-top: 60px;*/
}
</style>
