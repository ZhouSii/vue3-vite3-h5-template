<template>
  <m-input name="uploader" :label="label" :is-input="false" :label-align="labelAlign">
    <input
      ref="fileInput"
      type="file"
      accept="“”"
      style="display: none"
      :multiple="multiple"
      @change="uploadFile"
    />
    <van-button icon="upgrade" type="primary" size="small" @click="onClickUpload"
      >上传文件</van-button
    >
  </m-input>
</template>

<script lang="ts">
export default { name: 'MUploadFile' }
</script>
<script setup lang="ts">
import coreApi from '@/service/api/core'
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'

const props = defineProps({
  ...defaultProps,
  labelAlign: {
    type: String,
    default: 'left',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024,
  },
  maxCount: {
    type: Number,
    default: 10,
  },
  fileType: {
    type: String,
    default: 'jpg,jpeg,png',
  },
  attrs: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

const fileInput: any = ref(null)

const uploadValue = ref([] as any)

// 监听数据赋值显示
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    // console.log('newValue, oldValue:', newValue, oldValue)

    if (newValue) {
      const urlList = newValue.split(',')

      uploadValue.value = urlList.map((url: string) => {
        return {
          url: url,
        }
      })

      // console.log('uploadValue:', uploadValue.value)
    }
  },
  {
    immediate: true,
  }
)

// 上传文件
const onClickUpload = () => {
  // 触发上传
  fileInput.value.dispatchEvent(new MouseEvent('click'))
}

const uploadFile = (event) => {
  console.log('evevnt:', event)

  const file = event.target.files[0]

  console.log('file:', file)
}

const onOversize = (): void => {
  useVant.vantToastMixin(`当前图片大于${props.attrs.maxSize}M,为保证您的资料提交成功,请重新选择!`)
}
// 删除操作
const beforeDelete = (file: any, detail: any): void => {
  // console.log('file, detail,item', file, detail)
  // 获取当前上传对象
  const index = detail.index

  uploadValue.value.splice(index, 1)

  emitValue()
}

// 上传前类型判断、返回布尔值
const beforeRead = (file: any) => {
  // 文件类型(file.type)、大小限制(file.size)

  if (props.attrs.fileType) {
    const fileType = file.name.replace(/.+\./, '')
    const isFileType = props.attrs.fileType.split(',').includes(fileType)

    if (!isFileType) {
      return useVant.vantToastMixin(`只能上传${props.attrs.fileType}格式图片!`)
    }
    return isFileType
  }

  return true
}

// 上传图片、文件
const afterRead = async (file: any, detail: any): Promise<void> => {
  console.log('file, detail,item', file, detail)
  // 获取当前上传对象
  const index = detail.index
  file.status = 'uploading'
  file.message = '上传中...'

  try {
    const { data } = await coreApi.upload({
      file: file.file,
    })

    // console.log('上传成功:', data)
    uploadValue.value[index].url = data.url

    emitValue()
    file.status = 'done'
  } catch (error) {
    console.log('error:', error)

    file.status = 'failed'
    file.message = '上传失败'
  }
}

// 回传数据
const emitValue = (): void => {
  emit('update:modelValue', uploadValue.value.map((item) => item.url).join(','))
}
</script>
