import http from '@/service/http'
import * as T from './types'
import { GetProjectsByPageSo } from '~/api/competitor/request/GetProjectsByPageSo'

const coreApi: T.ICoreApi = {
  companyList() {
    return http({
      method: 'POST',
      url: '/wf/admin/wfType/getCompanys.json',
    })
  },
  hotelList(data) {
    return http({
      url: '/bd/admin/project/getProjectByPage',
      data,
      method: 'post',
    })
  },
  reserveHotelList(data) {
    return http({
      url: '/bd/admin/projectReserve/getProjectReservesByPage',
      data,
      method: 'post',
    })
  },
  competeHotelList(data: GetProjectsByPageSo) {
    return http({
      url: '/bd/admin/project/getAllProjectsByPage',
      data,
      method: 'post',
    })
  },
  getAllOnlyProjectsByPage(data: GetProjectsByPageSo) {
    return http({
      url: '/bd/admin/project/getAllOnlyProjectsByPage',
      data,
      method: 'post',
    })
  },
  hotelDetails(id) {
    return http({
      url: `/bd/admin/project/loadData/${id}`,
      method: 'post',
    })
  },
  usersList(data) {
    return http({
      url: '/sys/admin/user/getUsersByPage',
      data,
      method: 'post',
    })
  },
  upload(data) {
    return http({
      url: '/sys/admin/file/upload.json',
      data,
      method: 'post',
      isUploadFile: true,
    })
  },
  approvalStream(matterName, formId) {
    return http({
      url: `/wf/admin/wfInstance/getInstanceLogs/${matterName}/${formId}.json`,
      method: 'post',
    })
  },
  currNodeField(id) {
    return http({
      url: `/wf/admin/wfNodeFieldPermission/getCurrNodeFieldPermission/${id}`,
      method: 'post',
    })
  },
  getRejectNode(id) {
    return http({
      url: `/wf/admin/wfTaskItem/getRegectNode/${id}.json`,
      method: 'post',
    })
  },
  agree(id, data) {
    return http({
      url: `/wf/admin/wfTaskItem/pass/${id}.json`,
      method: 'post',
      data,
    })
  },
  refuse(id, ejectId, data) {
    return http({
      url: `/wf/admin/wfTaskItem/reject/${id}/${ejectId}.json`,
      method: 'post',
      data,
    })
  },
  void(id) {
    return http({
      method: 'post',
      url: `/wf/admin/wfInstance/cancel/${id}.json`,
    })
  },
  withdraw(id) {
    return http({
      method: 'post',
      url: `/wf/admin/wfTaskItem/recall/${id}.json`,
    })
  },
  addSign(id, data) {
    return http({
      method: 'post',
      url: `/wf/admin/wfTaskItem/apostille/${id}`,
      data,
    })
  },
  getCountry() {
    return http({
      method: 'post',
      url: '/sys/admin/country/getCountrys.json',
      bfLoading: false,
    })
  },
  getProvince(data) {
    return http({
      method: 'post',
      url: '/sys/admin/province/getProvinces.json',
      data,
      bfLoading: false,
    })
  },
  getCity(data) {
    return http({
      method: 'post',
      url: '/sys/admin/city/getCitys',
      data,
      bfLoading: false,
    })
  },
  getArea(data) {
    return http({
      method: 'post',
      url: '/sys/admin/district/getDistricts',
      data,
      bfLoading: false,
    })
  },
  getBrands(data) {
    return http({
      method: 'post',
      url: '/sys/admin/brand/getBrands.json',
      data,
    })
  },
  getCategoryByCode(code) {
    return http({
      method: 'post',
      url: '/sys/admin/code/getCodesByCategory.json',
      data: {
        equalCategory: code,
      },
    })
  },
  getDevArea() {
    return http({
      method: 'post',
      url: '/sys/admin/region/getDevAreas.json',
    })
  },
  getCompanyList(data, isAll) {
    const url = isAll ? '/sys/admin/compnay/getAllCompanys' : '/sys/admin/compnay/getCompanys'
    return http({
      method: 'post',
      url,
      data,
    })
  },
  // 获取运营区域
  getOperateRegion() {
    return http({
      method: 'post',
      url: '/sys/admin/region/getOperateAreas.json',
    })
  },
}

export default coreApi
