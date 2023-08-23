<template>
  <m-input
    name="radio"
    :label="label"
    :is-input="false"
    :required="required"
    :rules="rules"
    :label-width="labelWidth"
    :label-align="labelAlign"
    :attrs="attrs"
  >
    <van-radio-group
      v-model="checked"
      :direction="attrs.direction || 'horizontal'"
      :disabled="disabled"
    >
      <van-radio v-for="item in columns" :key="item.value" :name="item.value">{{
        item.text
      }}</van-radio>
    </van-radio-group>
  </m-input>
</template>

<script lang="ts">
export default { name: 'MRadio' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'

const props = defineProps({
  ...defaultProps,
  labelAlign: {
    type: String,
    default: 'left',
  },
})
const emit = defineEmits(['update:modelValue', 'onChange'])

const checked = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('onChange', { type: 'radio', label: props.label, keyWord: props.keyWord, value: val })
  },
})

const { columns } = toRefs(props)
</script>
