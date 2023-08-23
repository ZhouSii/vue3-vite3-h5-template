import http from '@/service/http'
import * as T from './types'

const messageApi: T.messageApi = {
  // 根据项目id获取项目信息
  list(data) {
    return http({
      method: 'post',
      url: `/e/admin/managementDaily/getManagementDaily`,
      data,
    })
  },
  getManagementDetail(data) {
    return http({
      method: 'post',
      url: `/e/admin/managementDaily/getManagement`,
      data,
    })
  },
  addRead(data) {
    return http({
      method: 'post',
      url: `/e/admin/managementDailyLog/add`,
      data,
    })
  },
  getNotReadNum(data) {
    return http({
      method: 'post',
      url: `/e/admin/managementDaily/getManagementDailyNoReadNum`,
      data,
    })
  },
}

export default messageApi
