<template>
  <m-input
    name="uploader"
    :label="label"
    :required="required"
    :rules="rules"
    :is-input="false"
    :label-width="labelWidth"
    :label-align="labelAlign"
  >
    <van-uploader
      v-model="uploadValue"
      :preview-size="attrs.previewSize || previewSize"
      :multiple="attrs.multiple || multiple"
      :max-size="attrs.maxSize || maxSize"
      :max-count="attrs.maxCount || maxCount"
      :before-read="beforeRead"
      :after-read="afterRead"
      :before-delete="beforeDelete"
      :readonly="disabled"
      :deletable="!disabled"
      :show-upload="!disabled"
      @oversize="onOversize"
    >
    </van-uploader>
  </m-input>
</template>

<script lang="ts">
export default { name: 'MUpload' }
</script>
<script setup lang="ts">
import coreApi from '@/service/api/core'
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { ObjTy } from '~/common'
import { isEmptyArray } from '@/utils/is'

const props = defineProps({
  ...defaultProps,
  labelAlign: {
    type: String,
    default: 'left',
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024,
  },
  maxCount: {
    type: Number,
    default: 20,
  },
  previewSize: {
    type: Number,
    default: 60,
  },
  // fileType: 'jpg,jpeg,png',
  attrs: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])
const uploadValue = ref([] as any)

// 监听数据赋值显示
watch(
  () => props.modelValue,
  (newValue) => {
    // console.log('newValue, oldValue:', newValue)

    if (newValue) {
      const urlList = newValue || []

      if (urlList.length === uploadValue.value.length) {
        return
      }

      uploadValue.value = urlList.map((item: ObjTy) => {
        return {
          ...item,
          name: item.name || item.url.substr(item.url.lastIndexOf('/') + 1),
        }
      })
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

const onOversize = (): void => {
  return useVant.vantToastMixin(
    `当前图片大于${
      props.attrs.maxSize ? props.attrs.maxSize / 1024 / 1024 : props.maxSize / 1024 / 1024
    }M,为保证您的资料提交成功,请重新选择!`
  )
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
  file.status = 'uploading'
  file.message = '上传中...'
  const fileList = Array.isArray(file) ? file : [file]

  fileList.forEach(async (file) => {
    try {
      const { data } = await coreApi.upload({
        file: file.file,
      })

      const baseIndex = uploadValue.value.findIndex(
        (item: ObjTy) => item.file && item.file.name === file.file.name
      )
      uploadValue.value[baseIndex].info = data

      emitValue()
      file.status = 'done'
    } catch (error) {
      console.log('error:', error)

      file.status = 'failed'
      file.message = '上传失败'
    }
  })
}

// 回传数据
const emitValue = (): void => {
  const files = uploadValue.value.map((i: ObjTy) => {
    if (i.url) {
      return i
    }
    return i.info
  })
  emit('update:modelValue', files)
}
</script>
