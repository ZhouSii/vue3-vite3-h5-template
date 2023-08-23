import { ObjTy } from '~/common'

export interface info {
  projectId: number
}

export interface managementDetail extends info {
  endofday: string
  managementType: string
}

export interface addRead extends info {
  endofday: string
  userId: string
}

export interface messageApi {
  // 获取实时房态
  list: (data: info) => Promise<any>
  // 获取经营数据
  getManagementDetail: (data: managementDetail) => Promise<any>
  // 设置已读
  addRead: (data: addRead) => Promise<any>
  // 获取经营日报未读数量
  getNotReadNum: (data: info) => Promise<any>
}
