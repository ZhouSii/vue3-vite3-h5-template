<template>
  <div>
    <div>{{ name }}</div>
    <van-button @click="emitFather">emitFather</van-button>
    <van-button @click="getFatherMethod">getFatherMethod</van-button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue'
const props = defineProps({
  fatherName: {
    require: true,
    default: '',
    type: String,
  },
})
const state = reactive({
  name: 'Children',
})
//导出给refs使用
const childRef = ref('childRef')
const childMethod = () => {
  return 'childMethod'
}

const { proxy }: any = getCurrentInstance()
const getFatherMethod = () => {
  proxy.$parent.fartherMethod()
}
//emit
// 定义emit事件
const emit = defineEmits(['emitParent'])
const emitFather = () => {
  emit('emitParent', { val: '子组件传递的信息' })
}
onMounted(() => {
  console.log('得到父元素的prop', props.fatherName)
})
defineExpose({ childRef, childMethod })
//导出属性到页面中使用
const { name } = toRefs(state)
</script>

<style scoped lang="scss"></style>
