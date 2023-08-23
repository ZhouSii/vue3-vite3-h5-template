<template>
  <m-input
    v-model="selectedLabel"
    name="picker"
    readonly
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :rules="rules"
    customer-type="textarea"
    :attrs="{ rows: 1, autosize: true }"
    :label-width="labelWidth"
    @click="showPicker = true"
  >
    <template #button><span class="vanCheck"></span></template>
  </m-input>

  <van-popup
    v-model:show="showPicker"
    round
    position="bottom"
    :style="{ height: '50%' }"
    :teleport="attrs.teleport"
    class="MCheckPicker flex-col overflow-hidden"
    flex="~"
  >
    <div v-if="slotSearch" class="toolbar">
      <span class="cancel" @click="showPicker = false">取消</span>
      <div class="title">{{ label }}</div>
      <span class="confirm" @click="onConfirmSlot">确认</span>
    </div>
    <slot name="search"></slot>
    <div class="flex-1">
      <van-picker
        ref="picker"
        v-model="selected"
        :title="label"
        :columns="columns"
        :show-toolbar="!slotSearch"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </div>
  </van-popup>
</template>

<script lang="ts">
export default { name: 'MSelect' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { arrayToString, stringToArray, selectDictLabels } from '../utils/'

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择',
  },
})

//插槽信息
const slotSearch = !!useSlots().search

const { columns } = toRefs(props)

const showPicker = ref(false)

const emit = defineEmits(['update:modelValue', 'onChange'])
// 模版值
const slotSelected = ref('')
// 缓存当前值
const cacheSelected = ref()
// 当前选择的值
const selected = computed({
  get: () => {
    cacheSelected.value = props.modelValue + ''
    slotSelected.value = props.modelValue + ''
    return stringToArray(props.modelValue + '')
  },
  set: (val) => {
    slotSelected.value = val[0]
    // console.log('slotSelected.value:', slotSelected.value)
    // emit('update:modelValue', val.join(','))
  },
})

// 中文回显
const selectedLabel = computed(() => {
  return selectDictLabels(columns?.value, selected.value)
})

const onConfirmSlot = () => {
  if (cacheSelected.value !== slotSelected.value) {
    cacheSelected.value = slotSelected.value
    emit('onChange', cacheSelected.value)
  }
  showPicker.value = false
}

//单选确认
const onConfirm = ({ selectedValues, selectedOptions, selectedIndexes }): void => {
  // console.log(
  //   `当前值: ${selectedValues},当前options:${selectedOptions}, 当前索引: ${selectedIndexes}`
  // )
  const selected = arrayToString(selectedValues)

  if (cacheSelected.value !== selected) {
    cacheSelected.value = selected
    emit('update:modelValue', selected)
    emit('onChange', selected)
  }

  showPicker.value = false
}
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
  .toolbar {
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
  .main {
    flex: 1;
  }
}

:deep(.van-field__button) {
  align-self: baseline;
}
</style>
