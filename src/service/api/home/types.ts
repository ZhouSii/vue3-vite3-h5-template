import { ObjTy } from '~/common'

export interface info {
  projectId: number
}

export interface futureInfo {
  projectId: number
  futureType: number
}

export interface marketingInfo extends info {
  sortBy: string
  filterType: number
}

export interface homeApi {
  // 获取实时房态
  info: (data: info) => Promise<any>
  // 获取远期房态
  futureInfo: (data: futureInfo) => Promise<any>
  // 获取经营分析
  businessInfo: (data: info) => Promise<any>
  // 获取渠道占比
  channelInfo: (data: info) => Promise<any>
  // 收入结构
  incomeList: (data: info) => Promise<any>
  // 营销列表
  marketingInfo: (data: marketingInfo) => Promise<any>

  // 获取切换酒店数量
  getExchangeHotel: ({ equalUserId }: { equalUserId: string }) => Promise<any>
}
