<template>
  <div class="fromStyle">
    <slot name="header"></slot>
    <van-form ref="mVanForm" @submit="onSubmit">
      <van-cell-group>
        <template v-for="(item, key) in formModel" :key="key">
          <component
            :is="item.type"
            :ref="item.key"
            v-model="formData[key]"
            :key-word="key"
            :label="item.label"
            :columns="item.columns"
            :customer-type="item.customerType"
            :required="item.required || false"
            :rules="item.rules"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :attrs="item.attrs"
            :label-width="item.labelWidth"
            @on-change="onChange"
            @on-click-slot="onClickSlot"
          />
        </template>
      </van-cell-group>
      <div v-if="showBtn" class="btn-style">
        <van-button type="primary" class="br-22" color="#2A82E4" block native-type="submit">{{
          btnTitle
        }}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
export default { name: 'MForm' }
</script>
<script setup lang="ts">
import { ObjTy } from '~/common'

const props = defineProps({
  formModel: {
    type: Object,
    default: () => ({}),
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  showBtn: {
    type: Boolean,
    default: false,
  },
  btnTitle: {
    type: String,
    default: '下一步',
  },
})

const mVanForm = ref(null)

const { formModel, formData } = toRefs(props)

const emit = defineEmits(['onSubmit', 'onChange', 'onClickSlot'])

// 数据触发
const onChange = (data: ObjTy): void => {
  // console.log('数据触发data:', data)
  emit('onChange', data)
}

// 触发slot
const onClickSlot = (): void => {
  emit('onClickSlot')
}

// 提交
const onSubmit = (values: ObjTy) => {
  console.log('submit', values)
  console.log('submit', formData.value)
  emit('onSubmit', formData.value)
}

defineExpose({ mVanForm, onSubmit })
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fromStyle {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  position: relative;

  .btn-style {
    padding: 30px 15px;
  }
}
</style>
