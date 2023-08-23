export interface ServerResult<T = any> {
  data: T
  detailMsg: string
  message: string
  retCode: number
}

export enum ServerError {
  SUCCESS = 0,
  //权限
  ACL_NO_ACCESS = 30, // 无权限
  //login
  LOGIN_PASSWORD_ERROR = 7, //密码错误、用户不存在
  //license
  LICENSE_UNAUTHORIZED = 1043, //未授权【登出】
  LICENSE_SERVICE_UNAUTHORIZED = 1038, //服务未授权
  // LICENSE_EXPIRED = 1044, //已过期【登出】【已弃用】
  //token
  TOKEN_EXPIRED = 11, //已过期
  TOKEN_NO_LOGIN = 50028, //未登录
}
