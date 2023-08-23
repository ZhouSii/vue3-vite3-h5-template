import { isEmptyArray, isFunction } from '@/utils/is'
import { Ref, ComputedRef } from 'vue'
import { ObjTy } from '~/common'

interface MListHooksReturn<ItemType> {
  loading: Ref<boolean>
  curPage: Ref<number>
  finished: Ref<boolean>
  refreshing: Ref<boolean>
  total: Ref<number>
  pageSize: Ref<number>
  list: Ref<ItemType[]>
  onLoad: () => Promise<void>
  onRefresh: () => void
  reset: () => void
}

export default function useMList<ItemType extends ObjTy, FilterOption extends ObjTy>(
  listRequestFn: Function | ComputedRef<ObjTy | undefined>,
  filterOption: Ref<ObjTy>,
  transferListFn?: Function
): MListHooksReturn<ItemType> {
  // 是否加载完成
  const finished = ref(false)
  // 是否刷新当前页面
  const refreshing = ref(false)
  // 加载态
  const loading = ref(false)
  // 当前页
  const curPage = ref(1)
  // 当前请求页码数量
  const curPageRows = ref(10)
  // 总数量
  const total = ref(0)
  // 分页大小
  const pageSize = ref(10)
  // 数据
  const list = ref<ItemType[]>([])
  // 获取列表数据
  const onLoad = async () => {
    loading.value = true

    if (refreshing.value) {
      refreshing.value = false
      list.value = []
    }
    filterOption.value.page += 1

    // 保存当前页数量
    curPageRows.value = filterOption.value.rows

    try {
      const reqFn = isFunction(listRequestFn) ? listRequestFn : listRequestFn.value!.apiFn

      const { data } = await reqFn(filterOption.value)
      loading.value = false
      if (!data || isEmptyArray(data.rows)) {
        finished.value = true
      } else {
        const listData = transferListFn ? transferListFn(data.rows) : data.rows
        list.value = list.value.concat(listData)

        if (list.value.length >= data.records) {
          finished.value = true
        }
      }
    } catch (error) {
      list.value = []
      finished.value = true
    }
    // console.log('filterOption.value:', filterOption.value)
  }

  // 上拉刷新
  const onRefresh = () => {
    // 清空列表数据
    finished.value = false
    // 重新加载数据-将 loading 设置为 true，表示处于加载状态
    loading.value = true
    filterOption.value.page = 0
    list.value = []

    onLoad()
  }

  const reset = () => {
    if (!filterOption.value) {
      return
    }
    const keys = Reflect.ownKeys(filterOption.value)
    filterOption.value = {} as FilterOption
    keys.forEach((key) => {
      Reflect.set(filterOption.value!, key, undefined)
    })

    filterOption.value.page = 0
    filterOption.value.rows = curPageRows.value
    onLoad()
  }

  // 导出需要的属性和方法
  return {
    loading,
    finished,
    refreshing,
    curPage,
    total,
    pageSize,
    list,
    onLoad,
    onRefresh,
    reset,
  }
}
