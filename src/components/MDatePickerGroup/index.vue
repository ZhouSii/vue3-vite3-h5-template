<template>
  <div>
    <m-input
      v-model="dateLabel"
      name="datePickerGroup"
      readonly
      :label="label"
      :required="required"
      :placeholder="placeholder"
      :rules="rules"
      customer-type="textarea"
      :attrs="{ rows: 1, autosize: true }"
      @click="showPicker = true"
    >
      <template #button><span class="vanCheck"></span></template>
    </m-input>
    <van-popup v-model:show="showPicker" round position="bottom" :teleport="attrs.teleport">
      <van-picker-group
        :title="label"
        :tabs="['开始日期', '结束日期']"
        next-step-text="下一步"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <van-date-picker v-model="startDate" />
        <van-date-picker v-model="endDate" />
      </van-picker-group>
    </van-popup>
  </div>
</template>

<script lang="ts">
export default { name: 'MDatePickerGroup' }
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

const showPicker = ref(false)

// 时间转换
const formatterDate = (time?: string) => {
  const defaultTime = time || new Date()

  return [
    useCommon.moment(defaultTime).format('YYYY'),
    useCommon.moment(defaultTime).format('MM'),
    useCommon.moment(defaultTime).format('DD'),
  ]
}

// const toDay = useCommon.moment().format('YYYY-MM-DD HH:mm:ss')
// 开始时间
const startDate = ref(formatterDate())
// 结束时间
const endDate = ref(formatterDate())

const emit = defineEmits(['update:modelValue', 'getDate'])

const dateLabel = computed(() => {
  if (props.modelValue) {
    const defaultDate = props.modelValue.split('至')
    startDate.value = formatterDate(defaultDate[0])
    endDate.value = formatterDate(defaultDate[1])
  }
  return props.modelValue
})

const onCancel = () => {
  showPicker.value = false
}

//单选确认
const onConfirm = (): void => {
  //   console.log('startDate.value:', useCommon.moment(startDate.value).format('x')))
  //   console.log('endDate.value:', useCommon.moment(endDate.value).format('x')))
  //   console.log('startDate.value:', useCommon.moment(startDate.value).format('x'))
  //   console.log('endDate.value:', useCommon.moment(endDate.value).format('x'))
  // console.log('endDate.value:', useCommon.moment(startDate.value).isBefore(useCommon.moment(endDate.value)))
  const startX = useCommon.moment(startDate.value).format('x')
  const endX = useCommon.moment(endDate.value).format('x')
  // // if (useCommon.moment(startDate.value).isBefore(useCommon.moment(endDate.value))) {
  if (startX <= endX) {
    emit('update:modelValue', `${startDate.value.join('-')}至${endDate.value.join('-')}`)
    emit('getDate', [startDate.value.join('-'), endDate.value.join('-')])
    showPicker.value = false
  } else {
    useVant.vantToastMixin('结束日期应大于开始日期')
  }
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
