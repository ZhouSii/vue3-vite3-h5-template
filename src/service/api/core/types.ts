import { File } from '@babel/types'
import { ObjTy } from '~/common'
import { GetProjectsByPageSo } from '~/api/competitor/request/GetProjectsByPageSo'

interface uploadParams {
  file: File
  fileTypeId?: string
}

interface commonParams {
  page: number
  rows: number
  searchKey: string
  searchType: string
  getState?: number
}

export interface ICoreApi {
  // 获取公司列表
  companyList: () => Promise<any>
  // 获取酒店列表
  hotelList: (params: commonParams) => Promise<any>
  // 获取酒店列表
  reserveHotelList: (params: commonParams) => Promise<any>
  // 评估酒店-获取酒店或项目
  competeHotelList: (data: GetProjectsByPageSo) => Promise<any>
  //获取酒店或项目(竞品新接口)
  getAllOnlyProjectsByPage: (data: GetProjectsByPageSo) => Promise<any>
  // 酒店详情
  hotelDetails: (id: number) => Promise<any>
  // 获取用户列表
  usersList: (params: commonParams) => Promise<any>
  // 上传文件
  upload: (params: uploadParams) => Promise<any>
  // 获取审批流程
  approvalStream: (matterName: string, formId: number) => Promise<any>
  // 获取审批字段权限
  currNodeField: (id: number) => Promise<any>
  // 获取审批返回节点
  getRejectNode: (id: number) => Promise<any>
  // 审批通过
  agree: (id: number, params: ObjTy) => Promise<any>
  // 审批回退
  refuse: (id: number, ejectId: string, data: ObjTy) => Promise<any>
  // 作废
  void: (id: number) => Promise<any>
  // 撤回
  withdraw: (id: number) => Promise<any>
  // 加签
  addSign: (id: number, data: ObjTy) => Promise<any>
  // 获取国家
  getCountry: () => Promise<any>
  // 获取省份
  getProvince: (params: ObjTy) => Promise<any>
  // 获取城市
  getCity: (params: ObjTy) => Promise<any>
  // 获取区域
  getArea: (params: ObjTy) => Promise<any>
  // 获取品牌列表
  getBrands: (params: ObjTy) => Promise<any>
  // 根据code获取字典表数据
  getCategoryByCode: (code: string) => Promise<any>
  // 获取开发区域
  getDevArea: () => Promise<any>
  // 获取酒管
  getCompanyList: (params: ObjTy, tag?: boolean) => Promise<any>
  // 获取运营区域
  getOperateRegion: () => Promise<any>
}
