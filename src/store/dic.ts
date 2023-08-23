import { defineStore } from 'pinia'
import coreApi from '@/service/api/core'
import { transformCustomFieldName } from '@/utils'

const cacheMap = {}

export const useDicStore = defineStore({
  id: 'dic',
  state: () => ({
    dicData: {},
  }),
  actions: {
    setDic(key: string, list: any[]) {
      this.dicData[key] = list
    },
    getDic(key: string): Promise<any> {
      if (this.dicData[key]) {
        return new Promise((resolve, reject) => {
          resolve(this.dicData[key])
        })
      }

      //添加接口并发缓存处理
      if ((cacheMap?.[key]?.length ?? 0) === 0) {
        cacheMap[key] = []

        coreApi.getCategoryByCode(key).then((res) => {
          const dicList = transformCustomFieldName(res.data)

          while (cacheMap[key].length) {
            this.setDic(key, dicList)
            const resolve = cacheMap[key].shift()
            resolve[0](dicList)
          }
        })
      }
      return new Promise((resolve, reject) => {
        cacheMap[key].push([resolve, reject])
      })
    },
  },
})

export default useDicStore
