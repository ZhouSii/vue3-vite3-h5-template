<template>
  <m-base-input
    v-model="value"
    name="input"
    :label="label"
    :placeholder="attrs.placeholder || placeholder"
    :required="required"
    :rules="rules"
    :type="customerType"
    :label-width="labelWidth"
    :is-input="isInput"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="attrs.clearable || true"
    :rows="attrs.rows || 3"
    :autosize="attrs.autosize"
    :is-link="attrs.isLink"
    :maxlength="attrs.maxlength"
    :show-word-limit="attrs.showWordLimit"
    :input-align="attrs.inputAlign"
    :error-message-align="attrs.inputAlign"
    :formatter="attrs.formatter || formatter"
  >
    <template #input>
      <slot />
    </template>
    <template #button>
      <div v-if="attrs.btnSlots" @click="onClickSlot" v-html="attrs.btnSlots"></div>
      <slot name="button" />
    </template>
  </m-base-input>
</template>

<script lang="ts">
export default { name: 'MInput' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import MBaseInput from './MBaseInput.vue'
import { defaultProps } from '../mixins/formItemBase'
import { EMOJI_REGEX } from '@/utils/constants'

const props = defineProps({
  ...defaultProps,
  isInput: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
})

const emit = defineEmits(['update:modelValue', 'onClickSlot'])
// 默认过滤表情
const formatter = (value: string) => value.replace(EMOJI_REGEX, '')

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})

const onClickSlot = (): void => {
  emit('onClickSlot')
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.m-input {
  // padding: 15px 16px;
  :deep(.van-field__label) {
    font-size: 14px;
    // color: rgb(128, 128, 128);
    // line-height: 21px;
  }
  :deep(.van-field__value) {
    font-size: 14px;
    color: #bfbfbf;
    // line-height: 21px;
  }

  :deep(.van-field__label--top) {
    margin-bottom: 10px;
  }
}
</style>
