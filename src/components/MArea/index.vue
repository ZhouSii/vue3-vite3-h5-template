<template>
  <m-input
    v-model="fieldValue"
    name="picker"
    readonly
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :rules="rules"
    customer-type="textarea"
    :attrs="{ rows: 1, autosize: true }"
    :label-width="labelWidth"
    :label-align="labelAlign"
    @click="showPicker = true"
  >
    <template #button><span class="vanCheck"></span></template>
  </m-input>

  <van-popup
    v-model:show="showPicker"
    round
    position="bottom"
    class="MCheckPicker"
    :teleport="attrs.teleport"
  >
    <van-cascader
      v-model="cascaderValue"
      title="请选择所在地区"
      :options="options"
      :closeable="false"
      @close="showPicker = false"
      @change="onChange"
      @finish="onFinish"
    >
      <template #title>
        <div class="toolbar">
          <span class="cancel" @click="showPicker = false">取消</span>
          <div class="title">请选择所在地区</div>
          <span class="confirm" @click="onClickConfirm">确认</span>
        </div>
      </template>
    </van-cascader>
  </van-popup>
</template>

<script lang="ts">
export default { name: 'MArea' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { ObjTy } from '~/common'
import { isEmptyArray } from '@/utils/is'
import useAreaStore from '@/store/area'
import { objectMerge } from '@/utils/core'

interface areaProps {
  text: string
  value: number
  children?: areaProps[] | null
}

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择',
  },
  labelAlign: {
    type: String,
    default: 'left',
  },
  leaf: {
    type: Number,
    default: 3,
  },
})
// 省市区数据
const store = useAreaStore()
// 当前显示中文
const fieldValue = computed(() => props.modelValue)
// 保存已选数据
const cacheSelected = ref([] as any)
// 当前选择的数据
const cascaderValue = ref('')
// 级联选择数据
const options = ref([] as any)
// 展示弹窗
const showPicker = ref(false)
// 缓存当前传入的回显字段，触发lable显示
const cacheModel = ref([] as any)

const emit = defineEmits(['update:modelValue', 'getData'])
// 请求接口
const areaApi = [store.getProvince, store.getCity, store.getArea]
// 设置省市区数据-回显数据
const setDefault = async (defaultArea: number[], areaData: areaProps[], index?: number) => {
  const idx = index || 0

  if (isEmptyArray(defaultArea)) {
    return areaData
  }
  const curVal = defaultArea.shift()
  const curItem = areaData.find((item) => item.value === curVal)

  if (!curItem || !curVal) {
    // 如果 curItem 是 undefined，则跳过后续操作
    return
  }
  // 缓存已选数据
  cacheSelected.value.push(curItem)
  // 如果缓存的值和当前选择的值的数量相同，则返回数据
  if (cacheModel.value.length === cacheSelected.value.length) {
    emit('update:modelValue', getAreaLabel(cacheSelected.value))
  }

  // console.log('curItem.children:', curItem.children)
  if (idx >= 2) {
    return
  }
  curItem.children = (await areaApi[idx](curVal, idx === props.leaf - 1)) as areaProps[]
  setDefault(defaultArea, curItem.children, idx + 1)
}
const onChange = async ({ value, selectedOptions, tabIndex }): Promise<void> => {
  // console.log('onChange:', tabIndex, selectedOptions)

  if (tabIndex < props.leaf) {
    const data = await areaApi[tabIndex](value, tabIndex === props.leaf - 1)
    await setCacheSelected(selectedOptions, data, value)
  }
  cacheSelected.value = selectedOptions
}
// 赋值
const setCacheSelected = (
  selectedOptions: areaProps[],
  children: areaProps[],
  id: number
): void => {
  selectedOptions.forEach((item: ObjTy) => {
    if (item.value === id) {
      item.children = children
    }
  })
}
// 确认
const onClickConfirm = () => {
  // console.log('cacheSelected.value:', cacheSelected.value)
  if (isEmptyArray(cacheSelected.value) || cacheSelected.value.length < 3) {
    return useVant.vantToastMixin('地址需要精确到城市！')
  }
  onFinish({ selectedOptions: cacheSelected.value })
}
// 获取省市区中文
const getAreaLabel = (data: areaProps[]) => {
  if (isEmptyArray(data)) {
    return ''
  }
  return data.map((area: { text: string }) => area.text).join('')
}
// 设置当前显示省市区数据
const setDefaultArea = async (data: any) => {
  cacheModel.value = objectMerge(data)
  const defaultArea = objectMerge(data)

  if (isEmptyArray(options.value)) {
    options.value = await store.getCountry()
  }

  console.log('设置当前显示省市区数据:', data)

  await setDefault(defaultArea, options.value)

  nextTick(() => {
    cascaderValue.value = data[data.length - 1]
  })
}
// 结束回调
const onFinish = ({ selectedOptions }) => {
  console.log('selectedOptions:', selectedOptions)
  emit('update:modelValue', getAreaLabel(selectedOptions))
  emit(
    'getData',
    selectedOptions.map((option: { value: any }) => option.value),
    selectedOptions
  )
  showPicker.value = false
}
const getAreaInfo = async (): Promise<void> => {
  options.value = await store.getCountry()
}

// 重置表单
const reset = (): void => {
  cascaderValue.value = '1'
}

getAreaInfo()

defineExpose({ setDefaultArea, reset })
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.vanCheck {
  background: #ffff;
  border: 0 none;
  color: #1989fa;
  background: url('@/assets/icons/btn_arrow_xiala.png') no-repeat center;
  background-size: contain;
  display: inline-block;
  width: 16px;
  height: 16px;
}

.MCheckPicker {
  display: flex;
  flex-direction: column;
  .toolbar {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;

    .cancel,
    .confirm {
      height: 100%;
      padding: 0 16px;
      font-size: 14px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      line-height: 44px;
    }
    .cancel {
      color: #969799;
    }
    .confirm {
      color: #1989fa;
    }
    .title {
      max-width: 50%;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

:deep(.van-field__button) {
  align-self: baseline;
}
</style>
