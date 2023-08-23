import router from './router'
import pinia from '@/store/pinia'
import { setToken, setLocation } from './utils/auth'
import { userStore } from '@/store/users'
const users = userStore(pinia)
// const whiteList = ['/login', '/auth-redirect']
/* eslint-disable */
router.beforeEach(async (to: any, from: any, next: any) => {
  // console.log('tototot:', to)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  /*路由发生改变修改页面的title */
  if (to.query.token) {
    setToken(to.query.token)
    // // 存储用户信息
    // to.query.authInfo && setUserInfo(JSON.parse(decodeURIComponent(to.query.authInfo)))
    // 存储坐标信息
    to.query.location && setLocation(JSON.parse(decodeURIComponent(to.query.location)))

    await users.GetUserInfo()
    next(to.path)
  } else {
    next()
  }

  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
  //   }
  // }
})

router.afterEach(() => {})
