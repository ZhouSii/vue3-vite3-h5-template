import { reactive } from 'vue'
import momentMini from 'moment-mini'
import { ObjTy } from '~/common'

const hooksFunc = function () {
  const moment = momentMini

  //data
  const state: ObjTy = reactive({
    //time relative
    todayTimeMixin: null,
    currentTimeMixin: null,
    todayTimeLastMixin: null,
    yesterdayTimeMixin: null,
    beforeThreeDateTimeMixin: null,
  })

  //create
  state.todayTimeMixin = momentMini().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.currentTimeMixin = momentMini(new Date()).format('YYYY-MM-DD HH:mm:ss')
  state.todayTimeLastMixin = momentMini().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.beforeThreeDateTimeMixin = momentMini().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
  state.yesterdayTimeMixin = momentMini().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')

  //function
  const sleepMixin = (time: number) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve('')
      }, time)
    })
  }
  // 回到顶部
  const scrollTop = (el?: string | undefined | null, top = 0) => {
    setTimeout(() => {
      const elStr = el || '#elong-st-ele'
      const element = document.querySelector(elStr)
      element?.scrollTo({ top: top || 0, behavior: 'smooth' })
    }, 300)
  }

  return {
    moment,
    sleepMixin,
    state,
    scrollTop,
  }
}

const useCommon = hooksFunc()

export { useCommon }
