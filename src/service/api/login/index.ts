import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
  get(data) {
    return http({
      url: '/third/admin/tuojian/validateToken',
      method: 'post',
      data,
    })
  },
}

export default loginApi
