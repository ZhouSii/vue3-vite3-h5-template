<template>
  <section absolute="~" class="app-main top-0 left-0 right-0 bottom-50px">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/'
const route = useRoute()
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
</script>

<style></style>
