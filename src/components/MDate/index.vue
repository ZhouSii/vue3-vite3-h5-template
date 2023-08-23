<template>
  <m-input
    v-model="dateLabel"
    name="datePicker"
    readonly
    :label="label"
    :required="required"
    :placeholder="placeholder"
    :rules="rules"
    @click="showPicker = true"
  >
    <template #button><span class="vanCheck"></span></template>
  </m-input>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-date-picker
      v-model="currentDate"
      :min-date="minDate"
      title=""
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts">
export default { name: 'MDate' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { arrayToString, stringToArray } from '../utils/'

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择',
  },
})

const showPicker = ref(false)

const emit = defineEmits(['update:modelValue'])

const minDate = computed(() => {
  const date = new Date(props?.attrs.minDate || null)
  if (isNaN(date.getTime())) {
    console.error('Invalid date')
    new Date(useCommon.moment().add(-20, 'years').format('YYYY-MM-DD HH:mm:ss'))
  } else {
    return date
  }
})

const currentDate = computed({
  get: () => {
    if (props.modelValue) {
      return stringToArray(props.modelValue, '-')
    }
    return stringToArray(useCommon.moment().format('YYYY-MM-DD'), '-')
  },
  set: (val) => {
    // emit('update:modelValue', val.join(','))
  },
})
const dateLabel = computed(() => props.modelValue)

//单选确认
const onConfirm = ({ selectedValues, selectedOptions, selectedIndexes }): void => {
  console.log(
    `当前值: ${selectedValues},当前options:${selectedOptions}, 当前索引: ${selectedIndexes}`
  )
  emit('update:modelValue', arrayToString(selectedValues, '-'))
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
</style>
