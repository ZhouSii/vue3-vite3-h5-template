import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
  get() {
    return http({
      url: '/sys/admin/user/currentUserInfo',
      method: 'post',
    })
  },
}

export default loginApi
