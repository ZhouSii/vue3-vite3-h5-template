<template>
  <van-dialog
    v-model:show="showPop"
    title="修改酒店名称"
    show-cancel-button
    :before-close="onBeforeClose"
    width="auto"
    :teleport="teleport"
  >
    <div class="diag-content">
      <m-radio
        v-model="formData.standardName"
        :label-width="70"
        label="名称类型"
        :columns="STANDARD_NAME_COLUMNS"
      />
      <m-input
        v-model="formData.keyWord"
        :label="formData.standardName === '2' ? '关键词' : '酒店名称'"
        placeholder="请输入"
        :label-width="70"
        :clearable="true"
      />

      <template v-if="formData.standardName === '2'">
        <div class="diag-header">
          <span>酒店命名规则: 品牌+城市+<span class="caret-red-500">酒店商圈关键字</span>+店</span>
          <span>例如：艺龙酒店（广州XXXXX店）</span>
        </div>
        <div class="tips">当前酒店名称为：{{ currentHotelName }}</div>
      </template>
    </div>
  </van-dialog>
</template>

<script lang="ts">
export default { name: 'MReviseHotelName' }
</script>
<script setup lang="ts">
import { isEmptyObject } from '@/utils/is'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  details: {
    type: Object,
    default: () => ({}),
  },
  teleport: {
    type: String,
    default: '',
  },
})
// 名称类型
const STANDARD_NAME_COLUMNS = [
  {
    value: '2',
    text: '标准',
  },
  {
    value: '1',
    text: '非标准',
  },
]
const showPop = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})

const emit = defineEmits(['update:modelValue', 'onSubmit'])

// 弹窗显示
const { details } = toRefs(props)

watch(
  () => details.value,
  (newVal) => {
    if (!isEmptyObject(newVal)) {
      formData.value.standardName = newVal.standardName ? newVal.standardName + '' : '1'
      formData.value.keyWord = newVal.keyword
    }
  },
  {
    deep: true,
  }
)

// formData
const formData = ref({
  standardName: '1',
  keyWord: '',
})

// 标准-当前酒店名称
const currentHotelName = computed(
  () =>
    `${details.value.brandName}(${details.value.cityNameShort || ''}${
      formData.value.keyWord || 'XXXXX'
    }店)`
)

// 弹窗确认修改酒店名称
const onBeforeClose = (action: string): Promise<any> =>
  new Promise((resolve) => {
    if (action === 'confirm') {
      if (!formData.value.keyWord) {
        useVant.vantToastMixin('请输入酒店关键字!')
        return resolve(false)
      }

      emit('onSubmit', {
        ...formData.value,
        hotelName:
          formData.value.standardName === '2' ? currentHotelName.value : formData.value.keyWord,
      })
      resolve(true)
    } else {
      // 拦截取消操作
      resolve(true)
    }
  })
</script>

<style lang="scss" scoped>
.pms-handle {
  .content-form {
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
  }
}

.diag-content {
  padding: 20px 15px;
}
.diag-header {
  margin-bottom: 10px;
  span {
    color: rgba(166, 166, 166, 1);
    line-height: 20px;
    font-size: 12px;
  }
}

.tips {
  color: rgba(0, 120, 112, 1);
  font-size: 12px;
}
</style>
