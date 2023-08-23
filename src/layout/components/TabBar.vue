<template>
  <van-tabbar route active-color="#00942A">
    <van-tabbar-item replace to="/dashboard" icon="home-o">看板</van-tabbar-item>
    <van-tabbar-item
      replace
      to="/message"
      icon="chat-o"
      :badge="notReadNum"
      :badge-props="badgeProps"
      >消息</van-tabbar-item
    >
    <van-tabbar-item replace to="/workbench" icon="apps-o">工作台</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import messageApi from '@/service/api/message'
import { getProjectInfo } from '@/utils/auth'

const cacheNum = sessionStorage.getItem('notReadNum')
// 当前未读数量
const notReadNum = ref(cacheNum || 0)
// 设置参数
const badgeProps = {
  showZero: false,
}
// 获取经营日报未读数量
const init = async (): Promise<void> => {
  const { projectId } = getProjectInfo()

  const { data } = await messageApi.getNotReadNum({ projectId })

  if (cacheNum !== data) {
    notReadNum.value = data

    sessionStorage.setItem('notReadNum', data)
  }
}

init()
</script>

<style></style>
