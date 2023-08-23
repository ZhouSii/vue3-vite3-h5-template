<template>
  <div class="agree">
    <van-popup
      v-model:show="showPop"
      round
      position="bottom"
      :style="{
        height: type === 'agree' ? '70%' : '85%',
        'background-color': '#EDF0F7',
        display: 'flex',
        'flex-direction': 'column',
        overflow: 'hidden',
      }"
      class="MCheckPicker"
    >
      <div class="folder-header">
        <i></i>
        {{ popTitle }}
        <van-icon name="cross" size="16" @click="showPop = false" />
      </div>
      <div class="folder-container">
        <template v-if="type !== 'agree'">
          <div>
            <m-select v-model="popForm.ejectId" label="选择" :columns="refuseSelect" required />
            <m-radio v-model="popForm.backIsSkip" label="" :columns="backSelect" required />
          </div>
          <div class="divider bg-custom-bg"></div>
        </template>
        <template v-if="showUpload">
          <div>
            <m-upload v-model="popForm.files" :label-width="50" label="附件" />
          </div>
          <div class="divider bg-custom-bg"></div>
        </template>

        <div class="main">
          <div class="content">
            <van-field
              v-model="popForm.message"
              rows="4"
              autosize
              label=""
              type="textarea"
              placeholder="请输入"
            />
          </div>
          <div class="tips">
            <div class="title">推荐回复</div>
            <div class="tips-text">
              <span v-for="item in tips" :key="item" @click="onClickTips(item)">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="folder-footer">
        <van-row gutter="12" class="w-full">
          <van-col span="8">
            <van-button color="#F0F0F0" block class="cancelBtn" @click="showPop = false"
              >取消</van-button
            >
          </van-col>
          <van-col span="16">
            <van-button
              type="primary"
              block
              color="#2A82E4"
              class="agreeBtn"
              @click="onClickOperate"
              >确认</van-button
            >
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
export default { name: 'OperatePop' }
</script>
<script setup lang="ts">
import { ObjTy } from '~/common'
import coreApi from '@/service/api/core'
import { isEmptyArray } from '@/utils/is'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'agree',
  },
  details: {
    type: Object,
    default: () => ({}),
  },
  projectName: {
    type: String,
    default: '',
  },
  showUpload: {
    type: Boolean,
    default: true,
  },
  isRevise: {
    type: Boolean,
    default: false,
  },
})
const { projectName, isRevise, showUpload } = toRefs(props)

// 接收参数
const queryParams: ObjTy = useVueRouter.getQueryParam()

const popTitle = computed(() => (props.type === 'agree' ? '确认同意' : '确认回退'))

// 回退form
const popForm = ref({ ejectId: '', backIsSkip: 'N', message: '', files: [] })
// 回退节点
const refuseSelect = ref([] as any)
// 是否跳过全部节点
const backSelect = ref([
  { text: '全部节点重新走审批', value: 'N' },
  { text: '跳过已审批节点', value: 'Y' },
])
// 建议内容
const tips = computed(() =>
  props.type === 'agree'
    ? ['已审核', '同意', '确认', '好的', '可以', '通过', '情况属实', 'OK']
    : ['不同意', '拒绝', '流程不对', '时间不对', '重复提交', '未解决', '请补充材料', '请核实']
)

const emit = defineEmits(['update:modelValue', 'onClickAgree'])

const showPop = computed({
  get: () => props.modelValue,
  set: (val) => {
    popForm.value.message = ''
    popForm.value.ejectId = ''
    popForm.value.backIsSkip = 'N'
    emit('update:modelValue', val)
  },
})

// 获取审核节点
const getRefuseNode = async () => {
  const { data } = await coreApi.getRejectNode(queryParams.id)

  refuseSelect.value = data.map((i: { texts: any; id: any }) => {
    return {
      ...i,
      text: i.texts,
      value: i.id,
    }
  })

  const defaultItem = refuseSelect.value.filter((i) => i.type === 'start')

  popForm.value.ejectId = !isEmptyArray(defaultItem)
    ? defaultItem[0].value
    : refuseSelect.value[0].value
}
// 审核时需要加载回退节点
if (queryParams && queryParams.type === 0) {
  getRefuseNode()
}

const onClickTips = (text: string): void => {
  popForm.value.message += text
}

const onClickOperate = async (): Promise<void> => {
  if (!popForm.value.message) {
    return useVant.vantToastMixin('请填写审批意见')
  }

  if (props.type === 'agree') {
    if (isRevise.value) {
      return emit('onClickAgree', popForm.value)
    }
    await onClickAgree()
  } else {
    await onClickRefuse()
  }
}

// 同意
const onClickAgree = async (): Promise<void> => {
  await coreApi.agree(queryParams.id, {
    remarks: popForm.value.message,
    files: popForm.value.files,
  })
  // 埋点
  useTrack({
    category: `${projectName.value}`,
    action: '点击',
    label: `${projectName.value}-审批-通过`,
    value: {
      remarks: popForm.value.message,
      files: popForm.value.files,
    },
  })
  useVant.vantToastMixin('审批完成', 'success')
  showPop.value = false
  setTimeout(() => {
    useVueRouter.routerReplaceMixin('Approval', { refresh: true })
  }, 500)
}

// 拒绝
const onClickRefuse = async (): Promise<void> => {
  await coreApi.refuse(queryParams.id, popForm.value.ejectId, {
    remarks: popForm.value.message,
    backIsSkip: popForm.value.backIsSkip,
    files: popForm.value.files,
  })

  // 埋点
  useTrack({
    category: `${props.projectName}`,
    action: '点击',
    label: `${props.projectName}-审批-回退`,
    value: {
      id: queryParams.id,
      remarks: popForm.value.message,
      ...popForm.value,
      files: popForm.value.files,
    },
  })

  useVant.vantToastMixin('回退到指定节点成功', 'success')
  showPop.value = false

  setTimeout(() => {
    useVueRouter.routerReplaceMixin('Approval', { refresh: true })
  }, 500)
}
</script>

<style lang="scss" scoped>
.agree {
  .MCheckPicker {
    .folder-header {
      padding: 10px 20px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    .folder-container {
      flex: 1;
      margin-bottom: 1px;
      overflow-x: hidden;
      background: #fff;
      // overflow: hidden;

      // padding: 15px 20px 5px;
      // display: flex;
      // flex-direction: column;

      .divider {
        height: 5px;
      }
      .main {
        background: #fff;
        padding: 12px 16px 5px;
        display: flex;
        flex-direction: column;
      }

      .content {
        // flex: 1;
        // overflow-x: hidden;
        margin-bottom: 10px;

        :deep(.van-cell) {
          padding: 0;
        }
      }

      .tips {
        .title {
          font-size: 12px;
          color: rgba(166, 166, 166, 1);
          line-height: 20px;
          margin-bottom: 10px;
        }

        .tips-text {
          span {
            font-size: 12px;
            display: inline-block;
            padding: 5px 7px;
            color: rgba(56, 56, 56, 1);
            border-radius: 2.62px;
            background: #f5f5f5;
            margin-bottom: 5px;
          }

          span:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
    }

    .folder-footer {
      background: #fff;
      padding: 10px 20px 30px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
