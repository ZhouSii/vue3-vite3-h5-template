<template>
  <div class="m-table" flex flex-col overflow-hidden py-12px :style="{ height: height }">
    <van-row :gutter="gutter" class="divider-bottom" mx-8px>
      <van-col
        v-for="header in headers"
        :key="header.text"
        :span="header.span"
        text="xs text-2"
        p="y-10px"
        :style="{ 'text-align': header.align || 'center' }"
        >{{ header.text }}</van-col
      >
    </van-row>
    <template v-if="isEmptyArray(data)">
      <van-empty description="暂无数据" />
    </template>
    <template v-else>
      <div flex-1 overflow="x-hidden" relative>
        <!-- <m-scroll> -->
        <van-row v-for="(item, index) in data" :key="item.text" :gutter="gutter" mx-8px>
          <van-col
            v-for="(header, key) in headers"
            :key="header.text"
            :span="header.span"
            text="sm text-1"
            p="y-10px"
            :style="{
              'text-align': header.align || 'center',
            }"
          >
            <span
              v-if="header.withCircle"
              class="circle"
              :class="getCircleClass(item[header.prop])"
            ></span>
            <span
              :class="['span-text', item.isSub ? `subCol subCol-${key}` : '']"
              :style="{ 'font-weight': isFooter && index === data.length - 1 ? '550' : 'normal' }"
              >{{ item[header.prop] }}</span
            >
            <span v-if="header.tagField" :class="getTagColor(item[header.tagField])">{{
              item[header.tagField]
            }}</span>
          </van-col>
        </van-row>
        <!-- </m-scroll> -->
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default { name: 'MTable' }
</script>
<script setup lang="ts">
import { PropType } from 'vue'
import { TableHeader } from './types'
import { ObjTy } from '~/common'
import { isEmptyArray } from '@/utils/is'

const props = defineProps({
  headers: {
    type: Array as PropType<TableHeader[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<ObjTy[]>,
    default: () => [],
  },
  gutter: {
    type: Number,
    default: 5,
  },
  isFooter: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: 'auto',
  },
})

const { data } = toRefs(props)

// 比较百分比方法
const isBigger = (percent1, percent2) => {
  // 将百分数转换为小数
  const decimal1 = parseFloat(percent1.replace('%', '')) / 100
  const decimal2 = parseFloat(percent2.replace('%', '')) / 100

  if (!decimal1 || !decimal2) {
    return false
  }

  return decimal1 >= decimal2
}
// 获取小圆点class
const getCircleClass = (value) => {
  if (value === '100.0%') {
    return 'circle-grey'
  } else if (isBigger(value, '80%')) {
    return 'circle-red'
  }
  return 'circle-green'
}

// 获取标签颜色
const getTagColor = (value: string) => {
  if (value === '次重要') {
    return 'purple-text'
  } else if (value === '重要') {
    return 'error-text'
  } else if (value === '一般') {
    return 'link-text'
  }
  return 'selected-text'
}
</script>

<style scoped lang="scss">
.m-table {
  background: #fff;
  border-radius: 8px;

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 2px;

    &.circle-grey {
      background-color: var(--edt-c-gray);
    }
    &.circle-red {
      background-color: var(--edt-c-red);
    }
    &.circle-green {
      background-color: var(--edt-c-green);
    }
  }

  .span-text {
    min-width: 50px;
  }

  .selected-text {
    color: var(--edt-c-green);
  }
  .error-text {
    color: var(--edt-c-red);
  }
  .link-text {
    color: var(--edt-c-blue-base);
  }
  .purple-text {
    color: #ac33c1;
  }

  .subCol {
    color: var(--edt-c-green);
  }

  .subCol-0 {
    margin-left: 15px;
  }
}
</style>
