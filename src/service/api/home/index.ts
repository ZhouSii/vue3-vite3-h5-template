import http from '@/service/http'
import * as T from './types'

const homeApi: T.homeApi = {
  // 根据项目id获取项目信息
  info(data) {
    return http({
      method: 'post',
      url: `/e/admin/roomStatus/getNowRoomReport`,
      data,
    })
  },
  futureInfo(data) {
    return http({
      method: 'post',
      url: `/e/admin/roomStatus/getFutureRoomReport`,
      data,
    })
  },
  businessInfo(data) {
    return http({
      method: 'post',
      url: `/e/admin/hotelLeaseReport/getHotelAnalysis`,
      data,
    })
  },
  channelInfo(data) {
    return http({
      method: 'post',
      url: `/e/admin/hotelLeaseReport/getHotelGuestSource`,
      data,
    })
  },
  incomeList(data) {
    return http({
      method: 'post',
      url: `/e/admin/hotelLeaseReport/getHotelSortRanking`,
      data,
    })
  },
  marketingInfo(data) {
    return http({
      method: 'post',
      url: `/e/admin/marketCalendarReport/hots`,
      data,
    })
  },
  getExchangeHotel(data) {
    return http({
      method: 'post',
      url: `e/admin/project/getOwnerProjectVos`,
      data,
    })
  },
}

export default homeApi
