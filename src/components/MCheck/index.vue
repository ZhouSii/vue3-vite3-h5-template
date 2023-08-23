<template>
  <m-input name="check" :label="label" :is-input="false" :required="required" :rules="rules">
    <van-checkbox-group v-model="checked" direction="horizontal">
      <van-checkbox v-for="item in columns" :key="item.value" :name="item.value" :shape="shape">{{
        item.text
      }}</van-checkbox>
    </van-checkbox-group>
  </m-input>
</template>

<script lang="ts">
export default { name: 'MCheck' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { arrayToString, stringToArray } from '../utils/'

const props = defineProps({
  ...defaultProps,
})

const emit = defineEmits(['update:modelValue'])

const checked = computed({
  get: () => stringToArray(props.modelValue),
  set: (val) => {
    emit('update:modelValue', arrayToString(val))
  },
})

const { columns } = toRefs(props)
</script>
