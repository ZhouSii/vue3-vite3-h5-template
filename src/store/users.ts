import { defineStore } from 'pinia'
import { ObjTy } from '~/common'
import loginApi from '@/service/api/login/'
import {
  setToken,
  getToken,
  setUserInfo,
  setProjectInfo,
  removeToken,
  removeUserInfo,
} from '@/utils/auth'
import eventBus from '@/utils/bus'

export const userStore = defineStore({
  id: 'users',
  state: (): ObjTy => ({
    userInfo: {},
  }),
  actions: {
    GetUserInfo() {
      return new Promise<void>((resolve, reject) => {
        loginApi.get({ token: getToken() }).then((response: any) => {
          console.log('response:', response)

          const { code, data, msg } = response
          if (code === 'ok') {
            this.userInfo = data
            setUserInfo(data)
            setProjectInfo({
              hotelName: data.hotelName,
              projectId: data.projectId,
              projectCode: data.projectCode,
              projectName: data.projectName,
            })

            setTimeout(() => {
              // 设置水印信息
              eventBus.emit('setWatermark')
            }, 500)
            resolve()
          } else {
            reject(msg)
          }
        })
      })
    },
    // 前端 登出
    FedLogOut() {
      return new Promise<void>((resolve) => {
        removeToken()
        removeUserInfo()
        resolve()
      })
    },
  },
})
