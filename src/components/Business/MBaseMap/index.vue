<template>
  <div class="bMap">
    <m-map ref="mMapRef" @click-map="clickMap"></m-map>
    <div class="bMap-search">
      <van-cell-group inset>
        <van-field
          v-model="bMapSearch"
          center
          clearable
          label=""
          placeholder="请输入包含城市的地址进行搜索"
          border
        >
          <template #button>
            <van-button size="small" color="#12B584" type="primary" @click="onClickSearch"
              >搜索</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <van-popup
      v-model:show="showPicker"
      round
      position="bottom"
      :style="{ height: '50%' }"
      :teleport="teleport"
    >
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script lang="ts">
export default { name: 'MBaseMap' }
</script>
<script setup lang="ts">
import { getLocation } from '@/utils/auth'
import { ObjTy } from '~/common'

const props = defineProps({
  teleport: {
    type: String,
    default: null,
  },
})

// 获取位置信息
const baseLocation = getLocation()
// console.log('获取位置信息:', baseLocation)

// 当前地址雷彪
const columns = ref([] as any)
const showPicker = ref(false)
// 地图
const mMapRef = ref<HTMLElement | null | any>(null)
// 地图搜索
const bMapSearch = ref('')
// 缓存搜索地图信息
const cacheSearchKey = ref('')
// 转换小程序坐标显示到百度地图
const translateCallback = (data: ObjTy) => {
  console.log('translateCallback-data:', data)
  if (data.status === 0) {
    // 创建地图
    mMapRef.value?.createdMap(data.points[0])
    // 添加标注
    mMapRef.value?.createdMarker()
  }
}
// 设置 mark 坐标
const setMapMark = (location: { lng: number; lat: number }): void => {
  // 清除标记
  mMapRef.value?.clearMarkers()
  // 添加标注
  mMapRef.value?.createdMarker(location)
  // 返回数据
  emit('onSetLocation', location)
}
// 点击地图
const clickMap = async (e: any) => {
  setMapMark({ lng: e.latlng.lng, lat: e.latlng.lat })
}
// 地图搜索
const onClickSearch = async () => {
  if (cacheSearchKey.value !== bMapSearch.value) {
    try {
      const poiList = await mMapRef.value?.getLocationSearch(bMapSearch.value)

      columns.value = poiList.map((poi: { title: string; uid: string }) => {
        return {
          ...poi,
          text: poi.title,
          value: poi.uid,
        }
      })

      showPicker.value = true
      // 根据搜索地点获取经纬度
      // const res = await mMapRef.value?.getPoint(bMapSearch.value)
      // setMapMark({ lng: res.lng, lat: res.lat })
    } catch (error) {
      useVant.vantToastMixin(error as string)
    }
  }
}

const onConfirm = ({ selectedOptions }) => {
  const result = selectedOptions[0]
  // 根据搜索地点获取经纬度
  setMapMark({ lng: result.point.lng, lat: result.point.lat })
  showPicker.value = false
}

onMounted(async () => {
  mMapRef.value.translatePoint(
    { x: baseLocation.longitude, y: baseLocation.latitude },
    translateCallback
  )
})

//
const emit = defineEmits(['onSetLocation'])
defineExpose({
  mMapRef,
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bMap {
  height: 200px;
  margin: 0 12px;
  position: relative;

  .bMap-search {
    position: absolute;
    top: 5px;
    left: 0;
    right: 0;
    z-index: 999;

    :deep(.van-cell) {
      padding: 0px 0px 0 10px;
    }
  }
}
</style>
