<template>
  <van-field v-bind="$attrs" v-model="model" class="m-input">
    <template v-if="!isInput" #input>
      <slot name="input" />
    </template>
    <template #button>
      <slot name="button" />
    </template>
  </van-field>
</template>

<script lang="ts">
export default { name: 'MBaseInput' }
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isInput: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.m-input {
  // padding: 15px 16px;
  :deep(.van-field__label) {
    position: relative;

    &::before {
      position: absolute;
      left: -10px;
    }
  }
}
</style>
