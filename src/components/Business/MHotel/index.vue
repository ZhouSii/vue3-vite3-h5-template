<template>
  <div class="m-hotel">
    <div class="folder-search">
      <m-search @search="onSearch">
        <template #left>
          <van-button
            class="ml-12px"
            type="primary"
            icon="exchange"
            size="mini"
            color="#005253"
            icon-position="right"
            @click="onClickExchange"
            >{{ isShowProjectName ? '按酒店' : '按项目' }}</van-button
          ></template
        >
      </m-search>
    </div>
    <div class="folder-tabs">
      <van-tabs
        v-model:active="active"
        color="#005253"
        title-active-color="#005253"
        @click-tab="onClickTab"
      >
        <van-tab v-for="item in tabsList" :key="item.title" :title="item.title"></van-tab>
      </van-tabs>
    </div>

    <div class="folder-content">
      <van-pull-refresh v-model="refreshing" class="min-h-100%" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <m-tree ref="treeRefs" :tree-data="list" @click-item="clickItem" />

          <template #finished>
            <template v-if="!list.length"><van-empty description="暂无数据" /></template>
            <template v-else>没有更多了</template>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script lang="ts">
export default { name: 'MHotel' }
</script>
<script setup lang="ts">
import coreApi from '@/service/api/core'

import { isEmptyArray } from '@/utils/is'
import { ObjTy } from '~/common'
// 列表
import useMList from '@/hooks/business/useMList'
const props = defineProps({
  treeData: {
    type: Object,
    default: () => ({}),
  },
  getState: {
    type: Number,
    default: 5,
  },
})
// 查询条件
const searchForm = ref({
  page: 0,
  rows: 20,
  searchKey: '',
  searchType: '1',
  getState: props.getState,
})

// tab切换
const active = ref(0)
// 缓存当前tab
const cacheKey = ref(0)

// 切换显示
const onClickExchange = (): void => {
  isShowProjectName.value = !isShowProjectName.value
  list.value = exchangeName(list.value)
}

// 切换显示名称
const exchangeName = (list: Array<ObjTy>): Array<ObjTy> => {
  list.forEach((item: ObjTy) => {
    const itemName = isEmptyArray(item.children)
      ? isShowProjectName.value
        ? item.projectName
        : item.hotelName
      : item.name

    item.name = itemName ? itemName : item.name

    if (item.children) {
      item.children = exchangeName(item.children)
    }
  })
  return list
}

const { list, loading, finished, refreshing, onLoad, onRefresh } = useMList<ObjTy, ObjTy>(
  coreApi.hotelList,
  searchForm,
  exchangeName
)

// 当前是否按照项目名显示
const isShowProjectName = ref(false)

const tabsList = ref([
  { title: '酒管', type: '1' },
  { title: '城市', type: '2' },
  { title: '酒店', type: '3' },
])

const emit = defineEmits(['getData'])

// 切换tab
const onClickTab = () => {
  if (cacheKey.value === active.value) {
    return
  }
  cacheKey.value = active.value
  searchForm.value.searchType = active.value + 1 + ''
  onRefresh()
}

// 搜索回调
const onSearch = (val: string) => {
  searchForm.value.searchKey = val

  onRefresh()
}

// 获取酒店信息
const clickItem = (data: ObjTy): void => {
  console.log('获取酒店信息data:', data)
  if (!data.id) {
    return useVant.vantToastMixin('当前酒管暂无门店数据')
  }
  emit('getData', data)
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.m-hotel {
  background: rgb(237, 240, 247);
  height: 100%;
  overflow: hidden;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;

  .folder-content {
    flex: 1;
    overflow-x: hidden;
    background: #fff;
    margin-top: 10px;
  }
}
</style>
