<template>
  <m-input
    name="uploader-file"
    :label="label"
    :required="required"
    :rules="rules"
    :is-input="false"
    :label-width="labelAlign && labelAlign === 'top' ? '100%' : labelWidth"
    :label-align="labelAlign"
  >
    <div class="upload-file-folder flex flex-col">
      <template v-if="!disabled">
        <van-uploader
          v-model="uploadValue"
          :accept="accept"
          :multiple="attrs.multiple || multiple"
          :max-count="attrs.maxCount || maxCount"
          :max-size="attrs.maxSize || maxSize"
          :before-read="beforeRead"
          :after-read="afterRead"
          :preview-image="false"
          :readonly="disabled"
          :show-upload="!disabled"
          @oversize="onOversize"
        >
          <van-button icon="upgrade" type="primary" size="small" class="mb-5px"
            >上传文件</van-button
          >
        </van-uploader>
      </template>

      <div class="upload-file" @click.stop.prevent>
        <div v-for="(item, idx) in uploadValue" :key="item.url" class="upload-file-list">
          <span class="file-name" @click="onClickPreview(item)"
            ><van-icon name="link-o" /> {{ item.file?.name || item.name }}</span
          >
          <span v-if="!disabled" class="file-delete" @click.stop.prevent="beforeDelete(item, idx)">
            <van-icon name="cross" />
          </span>
        </div>
      </div>
    </div>
  </m-input>
</template>

<script lang="ts">
export default { name: 'MUploadFile' }
</script>
<script setup lang="ts">
import coreApi from '@/service/api/core'
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { ObjTy } from '~/common'

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
    default: 10,
  },
  accept: {
    type: String,
    default: '.doc,.docx,.docs,.xml,.pdf,.zip,.xls,.xlsx',
  },
  // fileType: 'jpg,jpeg,png',
  attrs: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])
// 上传数据
const uploadValue = ref([] as any)

// 监听数据赋值显示
watch(
  () => props.modelValue,
  (newValue, oldValue) => {
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

      // console.log('uploadValue:', uploadValue.value)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

const onOversize = (): void => {
  return useVant.vantToastMixin(
    `当前文件大于${
      props.attrs.maxSize ? props.attrs.maxSize / 1024 / 1024 : props.maxSize / 1024 / 1024
    }M,为保证您的资料提交成功,请重新选择!`
  )
}
// 删除操作
const beforeDelete = (file: any, index: number): void => {
  // console.log('file, detail,item', file, index)
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
      return useVant.vantToastMixin(`只能上传${props.attrs.fileType}格式文件!`)
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
  console.log('fileList:', fileList)
  console.log('uploadValue.value:', uploadValue.value)

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

// 预览文件
const onClickPreview = (item): void => {
  console.log('item:', item)
  item.url && useApp.goToPreviewFile(item.url)
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

<style lang="scss" scoped>
:deep(.van-cell__value) {
  flex: 1;
  overflow: hidden;
}

.upload-file-folder {
  width: 100%;
}

.upload-file {
  .upload-file-list {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    padding-bottom: 5px;
    position: relative;
    box-sizing: border-box;
    // border-radius: 4px;
    // width: 190px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .file-name {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // margin-right: 10px;
    }

    .file-delete {
      opacity: 0.75;
      margin-left: 10px;
    }
  }

  .upload-file-list:not(:first-child) {
    border-top: 1px solid #ebedf0;
    padding-top: 5px;
  }
}
</style>
