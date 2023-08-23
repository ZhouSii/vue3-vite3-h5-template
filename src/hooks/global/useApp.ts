import { removeToken } from '@/utils/auth'

const hooksFunc = function () {
  /**
   * 去登录
   */
  const goToLogin = () => {
    removeToken()
    // location.reload()
    window.uni &&
      window.uni.navigateTo({
        url: '/pages/login/login',
      })
  }

  /**
   * 返回上一页
   */
  const goBack = (delta?: number) => {
    window.uni &&
      window.uni.navigateBack({
        delta: delta || 1,
      })
  }

  /**
   * 跳转页面
   */
  const goNavigateTo = (url: string) => {
    console.log('跳转页面url:', url)

    window.uni &&
      window.uni.navigateTo({
        url: url,
      })
  }

  /**
   * 返回首页
   */
  const goToHome = () => {
    window.uni &&
      window.uni.reLaunch({
        url: '/pages/home/home',
      })
  }

  /**
   * 预览文件
   */
  const goToPreviewFile = (url: string) => {
    window.uni &&
      window.uni.navigateTo({
        url: `/pages_sub2/preview/index?url=${url}`,
      })
  }

  return {
    goToLogin,
    goNavigateTo,
    goBack,
    goToHome,
    goToPreviewFile,
  }
}

const useApp = hooksFunc()

export { useApp }
