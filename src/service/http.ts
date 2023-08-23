/* eslint-disable no-self-assign */
import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'
import { AxiosConfigTy, AxiosReqTy, ObjTy } from '~/common'

let reqConfig: any

let loadingCount = 0

function addLoading() {
  loadingCount++
  useVant.vantLoadingMixin()
}

function isCloseLoading() {
  loadingCount--

  if (loadingCount <= 0) {
    useVant.vantCloseLoadingMixin()
  }
}

const service: any = axios.create()
// request
service.interceptors.request.use(
  (axiosReq: AxiosReqTy) => {
    // console.log('import.meta.env.VITE_APP_BASE_URL', import.meta.env.VITE_APP_BASE_URL)
    // console.log('axiosReq:', axiosReq)
    if (axiosReq.headers.noAuthorization) {
      axiosReq.headers.Authorization = axiosReq.headers.Authorization || ''
    } else {
      // token setting
      axiosReq.headers.token = getToken() || null
    }
    axiosReq.headers['Content-Type'] = 'application/json;chartset=utf-8'
    /* download file*/
    if (axiosReq.isDownLoadFile) {
      axiosReq.responseType = 'blob'
    }
    /* upload file*/
    if (axiosReq.isUploadFile) {
      const param = new FormData()
      for (const item in axiosReq.data) {
        param.append(item, axiosReq.data[item])
      }
      axiosReq.headers['Content-Type'] = 'multipart/form-data'

      axiosReq.data = param
    }
    if (axiosReq.bfLoading) {
      addLoading()
    }
    /*
     *params会拼接到url上,such as  "a=1&b=2"
     * */
    if (axiosReq.isParams) {
      axiosReq.params = axiosReq.data
      axiosReq.data = {}
    }

    //save axiosReq for res to using
    reqConfig = axiosReq
    return axiosReq
  },
  (err: any) => {
    Promise.reject(err)
  }
)
//response
service.interceptors.response.use(
  (axiosResp: any) => {
    if (reqConfig.afHLoading) {
      isCloseLoading()
    }
    // direct return, when download file
    if (reqConfig.isDownLoadFile) {
      return axiosResp
    }
    const { msg, code, status, isNeedUpdateToken, updateToken } = axiosResp.data
    //update token
    if (isNeedUpdateToken) {
      setToken(updateToken)
    }

    const successCode = '0,200,20000,ok'
    if (successCode.indexOf(code) !== -1) {
      //业务成功处理
      return axiosResp.data
    } else if (code === 'no_login_or_timeout' || status === '416') {
      useVant
        .vantConfirmMixin({
          title: '提示',
          message: '登录信息已失效, 请重新登录！',
        })
        .then(() => {
          useApp.goToLogin()
        })
    } else {
      //是否需要提示错误信息 isAlertErrorMsg:true 提示
      reqConfig.isAlertErrorMsg &&
        useVant.vantToastMixin(msg || '当前访问人数过多，请稍后再试!', 'fail', 2.5 * 1000)
    }

    //返回错误信息
    //如果未catch 走unhandledrejection进行收集
    return Promise.reject(axiosResp.data)
  },
  (err: any) => {
    // console.log('err===err', err)
    // console.log('err.response', err.response)

    /*http错误处理，处理跨域，404，401，500*/
    useVant.vantCloseLoadingMixin()
    if (err.response) {
      const errLog = err.response
      const status = err.response.status
      if (status === 401) {
        // 401:非法的token;Token 过期了;
        useVant
          .vantConfirmMixin({
            title: '提示',
            message: '登录信息已失效, 请重新登录！',
          })
          .then(() => {
            useApp.goToLogin()
          })
      } else if (status === 502) {
        /* empty */
        useVant.vantConfirmMixin({
          title: '提示',
          message: '当前访问人数过多，请稍后再试!',
        })
      } else {
        useVant.vantConfirmMixin({
          title: '提示',
          message: errLog.data.msg || '当前访问人数过多，请稍后再试!',
        })
      }
    } else {
      console.log('errRequest:' + err) // for debug
      useVant.vantConfirmMixin({
        title: '提示',
        message: err?.data?.msg || '当前访问人数过多，请稍后再试!',
      })
    }

    //如果是跨域
    //Network Error,cross origin
    const errObj: ObjTy = {
      msg: err.toString(),
      reqUrl: reqConfig.baseURL + reqConfig.url,
      params: reqConfig.isParams ? reqConfig.params : reqConfig.data,
    }
    return Promise.reject(JSON.stringify(errObj))
  }
)

export default function axiosReq({
  url,
  data,
  headers,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg,
}: AxiosConfigTy): any {
  return service({
    url: url,
    method: method ?? 'get',
    data: data ?? {},
    headers: headers ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? true,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL, // 设置基本基础url
    timeout: timeout ?? 60000, // 配置默认超时时间
  })
}
