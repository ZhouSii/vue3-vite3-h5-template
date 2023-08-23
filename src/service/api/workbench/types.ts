import { ApiRo } from '~/api/common'
import { ObjTy } from '~/common'

export interface hotelList {
  projectId: number
  keyword: string
}

export interface hotelInfo extends ObjTy {
  address: string
  baiduCoordinate: string
  baiduLat: string
  baiduLon: string
  hotelId: string
  hotelName: string
  [key: string]: any
}

export interface updateHotel {
  id: number //项目ID
  hotelId?: string //酒店id
  address?: string //酒店地址
  baiduX?: string //纬度，取baiduLat
  baiduY?: string //经度，取baiduLon
  xcHotelId?: string //携程酒店id
  fzHotelId?: string //飞猪酒店id
}

export interface getCostMaintenance {
  equalProjectId: number
  equalYear: number
  equalMonth?: number
}

export interface workbenchApi {
  // 获取待办数量
  num: () => Promise<any>
  // 酒店信息
  hotelInfo: (id: number) => Promise<any>
  // 获取酒店信息列表
  getHotelList: (data: hotelList) => Promise<ApiRo<hotelInfo[]>>
  // 更新项目信息
  update: (data: updateHotel) => Promise<any>
  // 查询成本维护
  getCostMaintenance: (data: getCostMaintenance) => Promise<any>
  // 保存成本维护
  saveCostMaintenance: (data: ObjTy) => Promise<any>
  // 获取预算维护
  getBudgetMaintenance: (data: getCostMaintenance) => Promise<any>
}
