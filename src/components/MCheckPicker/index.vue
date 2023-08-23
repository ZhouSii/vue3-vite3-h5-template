<template>
  <m-input
    v-model="checkedLabel"
    name="checkPicker"
    readonly
    :label="label"
    :required="required"
    :rules="rules"
    customer-type="textarea"
    :attrs="{ rows: 1, autosize: true }"
    @click="showPicker = true"
  >
    <template #button><span class="vanCheck"></span></template>
  </m-input>
  <van-popup
    v-model:show="showPicker"
    round
    position="bottom"
    :style="{ height: '60%' }"
    class="MCheckPicker"
    :teleport="attrs.teleport"
  >
    <div class="toolbar">
      <span class="cancel" @click="showPicker = false">取消</span>
      <div class="title">{{ label }}</div>
      <span class="confirm" @click="onConfirm">确认</span>
    </div>

    <div class="main">
      <van-checkbox-group ref="checkboxGroup" v-model="checked">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in columns"
            :key="item.value"
            clickable
            :title="item.text"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox
                :ref="(el) => (checkboxRefs[index] = el)"
                :name="item.value"
                @click.stop
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
</template>

<script lang="ts">
export default { name: 'MCheckPicker' }
</script>
<script setup lang="ts">
import MInput from '../MInput/index.vue'
import { defaultProps } from '../mixins/formItemBase'
import { arrayToString, stringToArray, selectDictLabels } from '../utils/'

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择',
  },
})

const { columns } = toRefs(props)

const checkboxRefs: any = ref([])

const showPicker = ref(false)

const emit = defineEmits(['update:modelValue'])

const checked: any = computed({
  get: () => stringToArray(props.modelValue),
  set: (val) => {
    emit('update:modelValue', arrayToString(val))
  },
})

const checkedLabel = computed(() => {
  return selectDictLabels(columns?.value, checked.value)
})

const onConfirm = (): void => {
  emit('update:modelValue', checked.value.join(','))
  showPicker.value = false
}

const toggle = (index: number): void => {
  checkboxRefs.value[index].toggle()
}

// onBeforeUpdate(() => {
//   checkboxRefs.value = []
// })
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

.MCheckPicker {
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
  .main {
    flex: 1;
  }
}
</style>
