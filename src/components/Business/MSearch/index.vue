<template>
  <div class="m-search">
    <slot name="left"></slot>
    <div class="m-search-container">
      <van-search
        v-model="searchVal"
        shape="round"
        :show-action="showAction"
        :placeholder="placeholder"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onCancel"
        @update:model-value="onInput"
      >
        <!-- <template #action>
          <div @click="onClickButton"><svg-icon icon-class="tools" class="tools" /> 筛选</div>
        </template> -->
        <template #action>
          <div class="action-search" @click="onSearch(searchVal)">搜索</div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'MSearch' }
</script>
<script setup lang="ts">
import { debounce } from '@/utils/core'

const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索关键词',
  },
  showAction: {
    type: Boolean,
    default: true,
  },
})

const searchVal = ref('')
const emit = defineEmits(['search'])

const onSearch = (val: string) => {
  emit('search', val)
}

const onCancel = () => {
  emit('search', '')
}

const fn = () => {
  //   emit('search', searchVal.value)
}

const onInput = debounce(fn)
</script>

<style lang="scss" scoped>
.m-search {
  display: flex;
  align-items: center;
  background: #fff;

  .m-search-container {
    flex: 1;
  }

  .action-search {
    color: #005253;
  }
}
</style>
