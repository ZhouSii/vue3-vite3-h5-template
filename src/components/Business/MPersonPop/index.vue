<template>
  <m-input
    v-model="personValue"
    name="picker"
    readonly
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :rules="rules"
    @click="showPicker = true"
  >
    <template #button><span class="vanCheck"></span></template>
  </m-input>

  <van-popup
    v-model:show="showPicker"
    round
    position="bottom"
    :style="{ height: '90%' }"
    class="MPersonPopup flex flex-col"
  >
    <div class="main">
      <m-person @get-data="getData" />
    </div>
  </van-popup>
</template>

<script lang="ts">
export default { name: 'MPersonPop' }
</script>
<script setup lang="ts">
import { ObjTy } from '~/common'
import { defaultProps } from '../../mixins/formItemBase'

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择',
  },
})

const showPicker = ref(false)

const emit = defineEmits(['update:modelValue', 'onChange', 'onClickSlot'])

const personValue = computed(() => props.modelValue)

const getData = (data: ObjTy): void => {
  // console.log('getData:', data)
  emit('onChange', { type: 'MPersonPop', label: props.label, keyWord: props.keyWord, data: data })
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

.MPersonPopup {
  display: flex;
  flex-direction: column;
  .toolbar {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: 44px;

    .cancel,
    .confirm {
      height: 100%;
      padding: 0 16px;
      font-size: 14px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      line-height: 44px;
    }
    .cancel {
      color: #969799;
    }
    .confirm {
      color: #1989fa;
    }
    .title {
      max-width: 50%;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .checkBtn {
    height: 44px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
  }
  .main {
    flex: 1;
    overflow: hidden;
  }
}
</style>
