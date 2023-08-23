<template>
  <div id="echart" ref="chartRef" :style="{ width: props.width, height: props.height }" />
</template>
<script lang="ts">
export default { name: 'MEchats' }
</script>
<script setup lang="ts">
import { markRaw, Ref } from 'vue'
// import { useDebounceFn } from '@vueuse/core'
import { throttle } from 'lodash-es'

import echarts, { type ECOption } from './config'
import { type EChartsType } from 'echarts/core'

interface Props {
  option: ECOption
  width?: string // 必须指定容器的宽高，否则无法显示。（容器内图表会自动获取父元素宽高）
  height: string
  theme?: Object | string | null
  loading?: boolean // 受控
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  theme: null,
  loading: false,
})

const chartRef = ref<HTMLDivElement | null>(null)
const chartInstance = ref<EChartsType | any>()

const draw = () => {
  if (chartInstance.value) {
    chartInstance.value.setOption(props.option, { notMerge: true })
  }
}

const init = () => {
  if (!chartRef.value) {
    return
  }

  // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
  chartInstance.value = echarts.getInstanceByDom(chartRef.value)
  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: 'canvas',
      })
    )

    draw()
  }
}

// 窗口自适应并开启过渡动画
const resize = (): void => {
  if (chartInstance.value) {
    chartInstance.value.resize({ animation: { duration: 300 } })
  }
}

// 自适应防抖优化
const debouncedResize = throttle(resize, 500)

// 对父组件暴露获取 ECharts 实例的方法，可直接通过实例调用原生函数
defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})

watch(props, () => {
  draw()
})

// 展示 loading 动画
watch(
  () => props.loading,
  (loading) => {
    loading ? chartInstance.value.showLoading() : chartInstance.value.hideLoading()
  }
)

onMounted(() => {
  init()
  window.addEventListener('resize', debouncedResize)
})

onBeforeUnmount(() => {
  // 容器被销毁之后，销毁实例，避免内存泄漏
  chartInstance.value?.dispose()
  window.removeEventListener('resize', debouncedResize)
})
</script>
