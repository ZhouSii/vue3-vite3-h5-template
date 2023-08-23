import { defineStore } from 'pinia'
import defaultSettings from '@/settings'

export const useAppStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    settings: defaultSettings,
    cachedViews: [] as Array<string>,
    test: false,
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data
    },
    M_vuex_test(data: boolean) {
      this.$patch((state) => {
        state.test = data
      })
    },
    /*keepAlive relative*/
    M_ADD_CACHED_VIEW(view: string) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) {
          return
        }
        state.cachedViews.push(view)
      })
    },
    M_DEL_CACHED_VIEW(view: string) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view)
        index > -1 && state.cachedViews.splice(index, 1)
      })
    },
    M_RESET_CACHED_VIEW() {
      this.$patch((state) => {
        state.cachedViews = []
      })
    },
    A_vuex_test(data: boolean) {
      this.$patch(() => {
        this.M_vuex_test(data)
      })
    },
  },
})
