<template>
  <m-input
    v-model="dateLabel"
    name="datePicker"
    readonly
    :label="label"
    :required="required"
    :placeholder="placeholder"
    :disabled="disabled"
    :rules="rules"
    @click="disabled ? '' : (showPicker = true)"
  >
    <template #button><span v-if="!disabled" class="vanCheck"></span></template>
  </m-input>
  <van-calendar
    v-model:show="showPicker"
    :default-date="defaultDate"
    :min-date="attrs.minDate || minDate"
    :max-date="attrs.maxDate"
    :teleport="attrs.teleport"
    @confirm="onConfirm"
  />
</template>

<script lang="ts">
export default { name: 'MCalendar' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择',
  },
})
const emit = defineEmits(['update:modelValue', 'onChange'])

const showPicker = ref(false)
// 可选择的时间
const minDate = ref(new Date('2000-01-01'))
// 默认选中的日期
const defaultDate = ref<Date | Date[] | null>(new Date())
// 当前时间显示
const dateLabel = computed(() => {
  if (props.modelValue) {
    defaultDate.value = new Date(props.modelValue)
  }
  return props.modelValue
})
// 格式化时间显示
const formatDate = (date) =>
  `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
//单选确认
const onConfirm = (date): void => {
  console.log(`当前值: `, date)
  console.log(`当前值: `, formatDate(date))
  emit('update:modelValue', formatDate(date))
  emit('onChange', formatDate(date))
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
