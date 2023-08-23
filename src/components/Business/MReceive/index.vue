<template>
  <div class="addressee">
    <m-title v-if="label" :label="label"></m-title>
    <template v-for="(item, index) in addresseeList" :key="index">
      <div class="addressee-item">
        <m-select
          v-model="item.signingSubject"
          label="签约方"
          :columns="signSubjectOptions"
          required
          :rules="[{ required: true, message: '请选择签约方' }]"
          :attrs="{ teleport: teleport }"
          @on-change="() => onChange(item)"
        />
        <m-input
          v-model="item.receivingName"
          label="收件人姓名"
          required
          :rules="[{ required: true, message: '请输入收件人姓名' }]"
        />
        <m-input
          v-model="item.receivingMobile"
          label="联系电话"
          required
          :rules="[
            { required: true, message: '请输入联系电话' },
            { pattern: PHONE_REGEX, message: '请输入正确的电话号码' },
          ]"
        />
        <m-input
          v-model="item.receivingAddress"
          label="收件地址"
          customer-type="textarea"
          required
          :rules="[{ required: true, message: '请输入收件地址' }]"
        />
        <div v-if="index !== 0" class="btn-cancel" @click="onClickDelete(index)">删除</div>
      </div>
    </template>
    <div class="add-suppleTerms" @click="onClickAdd">添加</div>
  </div>
</template>

<script lang="ts">
export default { name: 'MReceiveAddressee' }
</script>
<script setup lang="ts">
import { objectMerge } from '@/utils/core'
import { isEmptyArray, isEmptyObject } from '@/utils/is'
import { Ref } from 'vue'
import eventBus from '@/utils/bus'
import { ObjTy } from '~/common'
import { PHONE_REGEX } from '@/utils/constants'

// 地址类型
interface Address {
  signingSubject: string
  receivingName: string
  receivingMobile: string
  receivingAddress: string
}

// 签约方
const signSubjectOptions = ref([
  { text: '甲方', value: 'signingSubject_1' },
  { text: '乙方', value: 'signingSubject_2' },
])

// 地址内容
const ADDRESS_ITEM = {
  signingSubject: '', // 签约方
  receivingName: '', // 收件人姓名
  receivingMobile: '', // 联系电话
  receivingAddress: '', // 收件地址
}

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '收件人信息',
  },
  details: {
    type: Object,
    default: () => ({}),
  },
  isThirdParty: {
    type: Boolean,
    default: false,
  },
  teleport: {
    type: String,
    default: '',
  },
})

const { details } = toRefs(props)
// const emit = defineEmits(['update:modelValue'])

// 收件人信息
const addresseeList: Ref<Address[]> = ref(
  !isEmptyArray(props.modelValue as Address[])
    ? (props.modelValue as Address[])
    : [objectMerge(ADDRESS_ITEM)]
)
// 丙方数据
const thirdParty: ObjTy = ref({})

watch(
  () => props.modelValue as Address[],
  (newVal) => {
    console.log('收件人信息系:', newVal)

    if (!isEmptyArray(newVal)) {
      addresseeList.value = newVal
    }
  }
)
// watchEffect(() => {
//   emit('update:modelValue', addresseeList.value)
// })
// 丙方数据
eventBus.on('setThirdParty', (data: ObjTy) => {
  console.log('setThirdParty:', data)
  thirdParty.value = data
})
// 选择签约方
const onChange = (item: Address) => {
  // 乙方
  if (!isEmptyObject(details.value) && item.signingSubject === 'signingSubject_2') {
    item.receivingName = details.value.receivingName
    item.receivingMobile = details.value.receivingMobile
    item.receivingAddress = details.value.receivingAddress
  }
  // 丙方
  if (!isEmptyObject(thirdParty.value) && item.signingSubject === 'signingSubject_3') {
    item.receivingName = thirdParty.value.receivingName
    item.receivingMobile = thirdParty.value.receivingMobile
    item.receivingAddress = thirdParty.value.receivingAddress
  }
}
// 新增
const onClickAdd = (): void => {
  addresseeList.value.push(objectMerge(ADDRESS_ITEM))
}

// 删除
const onClickDelete = (index: number): void => {
  addresseeList.value.splice(index, 1)
}

const getParams = () => {
  const address = objectMerge(addresseeList.value)
  return address
}

onMounted(() => {
  props.isThirdParty && signSubjectOptions.value.push({ text: '丙方', value: 'signingSubject_3' })
})

defineExpose({ getParams })
</script>

<style lang="scss" scoped>
.addressee {
  .addressee-item {
    padding: 10px 0px 0;
    background: #f5f7fc;
    border-radius: 4px;
    margin: 6px 5px;
    overflow: hidden;

    .btn-cancel {
      color: #ff001a;
      text-align: center;
      padding: 7px 0 10px;
    }

    :deep(.van-cell) {
      background: #f5f7fc;
    }
  }
}

.label-content {
  display: flex;
  justify-content: space-between;
  width: 100%;

  span:last-child {
    color: #ff001a;
    font-size: 12px;
  }
}

.add-suppleTerms {
  color: #2a82e4;
  text-align: center;
  padding: 7px 0 10px;
}
</style>
