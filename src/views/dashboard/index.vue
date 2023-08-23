<template>
  <div class="dashboard folder">
    <div class="btn-list">
      <button class="btn" type="button" data-action="navigateTo">navigateTo</button>
      <button class="btn" type="button" data-action="redirectTo">redirectTo</button>
      <button class="btn" type="button" data-action="navigateBack" @click="navigateBack">
        navigateBack
      </button>
      <button class="btn" type="button" data-action="reLaunch">reLaunch</button>
      <button class="btn" type="button" data-action="switchTab">switchTab</button>
    </div>
    <!-- <van-tabs v-model:active="active">
      <van-tab title="封装组件">
        <van-form>
          <van-cell-group>
            <m-ceil label="单元格" />
            <m-input v-model="testValue" label="文本" />
            <m-select v-model="testValue" label="选择" :columns="columns" />
            <m-radio v-model="radio" label="单选" :columns="columns" />
            <m-date v-model="time" label="时间" />
            <m-check v-model="checked" label="多选" :columns="columns" />
            <m-check-picker v-model="checked" label="多选弹窗" :columns="columns" />
            <m-upload label="上传" />
          </van-cell-group>
        </van-form>
      </van-tab>
      <van-tab title="封装Form">
        <m-form :form-model="formModel" :form-data="formData" />
      </van-tab>
    </van-tabs> -->
  </div>
</template>

<script setup lang="ts">
import { ObjTy } from '~/common'

interface DataProps {
  formModel: ObjTy
  formData: ObjTy
}

const active = ref(0)

const testValue = ref('1')

const radio = ref('0')

const time = ref('2021/10/12')

const checked = ref('')

const checked22 = ref([])

setTimeout(() => {
  checked.value = '0'
  radio.value = '1'

  // columns.value = [
  //   { text: '复选框 a', value: 'a' },
  //   { text: '复选框 b', value: 'b' },
  //   { text: '复选框 c', value: 'c' },
  // ]
}, 1000)

const columns = ref([
  {
    value: '0',
    text: '男',
  },
  {
    value: '1',
    text: '女',
  },
])

const state: DataProps = reactive({
  formModel: {
    input: {
      label: '申请人信息',
      type: 'MCeil',
    },
    name: {
      label: '姓名',
      type: 'MInput',
      rules: [{ required: true, message: '请输入考生姓名' }],
      attr: {
        placeholder: '请输入xxl',
      },
    },
    sex: {
      label: '性别',
      type: 'MSelect',
      rules: [{ required: true, message: '请选择考生性别' }],
      columns: [
        {
          value: '022',
          text: '男1231',
        },
        {
          value: '133',
          text: '女321321',
        },
      ],
    },
    address: {
      label: '户籍地址',
      type: 'MInput',
      customerType: 'textarea',
      rules: [{ required: true, message: '请输入户籍地址' }],
      attr: {
        type: 'textarea',
      },
    },
    radio: {
      label: '单选',
      type: 'MRadio',
      rules: [{ required: true, message: '请选择考生性别' }],
      columns: [
        {
          value: '1',
          text: '单选1',
        },
        {
          value: '2',
          text: '单选2',
        },
      ],
    },
    checked: {
      label: '多选',
      type: 'MCheck',
      rules: [{ required: true, message: '请选择考生性别' }],
      columns: [
        { text: '复选框 a', value: 'a' },
        { text: '复选框 b', value: 'b' },
        { text: '复选框 c', value: 'c' },
      ],
    },
    checkPicker: {
      label: '多选弹窗',
      type: 'MCheckPicker',
      rules: [{ required: true, message: '请选择考生性别' }],
      columns: [
        { text: '复选框 a', value: 'a' },
        { text: '复选框 b', value: 'b' },
        { text: '复选框 c', value: 'c' },
      ],
    },
    date: {
      label: '日期选择',
      type: 'MDate',
      rules: [{ required: true, message: '请选择日期' }],
    },
  },
  formData: {
    name: '',
    sex: '',
    address: '',
    radio: '',
    checked: '',
    checkPicker: '',
  },
})

//ToExample
const ToHomework = (student: ObjTy) => {
  useVueRouter.routerPushMixin('Homework', student)
}

const navigateBack = () => {
  // uni.navigateBack({
  //   delta: 1,
  // })
}

const { formModel, formData } = toRefs(state)
</script>

<style scoped lang="scss"></style>
