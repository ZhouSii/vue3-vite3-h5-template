import http from '@/service/http'
import * as T from './types'
import { ApiRo } from '~/api/common'

const workbenchApi: T.workbenchApi = {
  num() {
    return http({
      method: 'post',
      url: `/e/admin/home/getHomeNums`,
    })
  },
  hotelInfo(id) {
    return http({
      method: 'post',
      url: `/e/admin/hotelInfo/getHotelInfoByProjectId/${id}`,
    })
  },
  getHotelList(data): Promise<ApiRo<T.hotelInfo[]>> {
    return http({
      method: 'post',
      url: `/third/admin/compete/searchHotelByKeyWordAndProjectId`,
      data,
    })
  },
  update(data) {
    return http({
      method: 'post',
      url: `/e/admin/project/updateProject`,
      data,
    })
  },
  getCostMaintenance(data) {
    return http({
      method: 'post',
      url: `/tj/admin/investCalcProjectReal/getInvestCalcItems`,
      data,
    })
  },
  saveCostMaintenance(data) {
    return http({
      method: 'post',
      url: `/tj/admin/investCalcProjectReal/saveInvestCalcProjectReals`,
      data,
    })
  },
  getBudgetMaintenance(data) {
    return http({
      method: 'post',
      url: `/e/admin/hotelBudget/getHotelBudgetVos`,
      data,
    })
  },
}

export default workbenchApi
