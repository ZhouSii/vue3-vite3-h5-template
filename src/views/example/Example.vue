<template>
  <van-tabs v-model:active="active">
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

        <div class="p-20px text-center">
          <h1 class="font-bold text-2xl mb-2">vite version: {devDependencies.vite}</h1>
        </div>

        <button
          bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
          text="sm white"
          font="mono light"
          p="y-2 x-4"
          border="2 rounded blue-200"
        >
          Button
        </button>
      </van-form>
    </van-tab>
    <van-tab title="封装Form">
      <m-form :form-model="formModel" :form-data="formData" />
    </van-tab>
    <van-tab title="方法">
      <div class="mbPx-4 mt-4">VuexUse</div>
      <van-button type="primary" block @click="VuexUse">VuexUse</van-button>

      <div class="mbPx-4 mt-4">SvgIcon</div>
      <van-button type="primary" block @click="SvgIcon">SvgIcon</van-button>

      <div class="mbPx-4 mt-4">KeepAlive</div>
      <van-button type="primary" block @click="KeepAlive">KeepAlive</van-button>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
// import axiosReq from '@/utils/axiosReq'

const active = ref(0)

const testValue = ref('1')

const radio = ref('0')

const time = ref('2021/10/12')

const checked = ref('')

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

const state = reactive({
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

const { formModel, formData } = toRefs(state)

const testReq = () => {
  const reqConfig = {
    url: '/ty-user/user/loginOut',
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: false,
  }
  // axiosReq(reqConfig).then((res: any) => {
  //   useVant.vantToastNoneMixin('req success')
  // })
}

//mock
const mockRelative = () => {
  useVueRouter.routerPushMixin('MockTest')
}

//VuexUse
const VuexUse = () => {
  useVueRouter.routerPushMixin('VuexUse')
}

//SvgIcon
const SvgIcon = () => {
  useVueRouter.routerPushMixin('SvgIcon')
}

//KeepAlive
const KeepAlive = () => {
  useVueRouter.routerPushMixin('KeepAlive')
}
</script>

<style scoped lang="scss"></style>
