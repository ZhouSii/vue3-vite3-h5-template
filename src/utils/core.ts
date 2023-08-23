import { getUserInfo } from '@/utils/auth'
import { ObjTy } from '~/common'

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
/* eslint-disable*/
export function debounce(func, wait?: number, immediate?: boolean) {
  let timeout, args, context, timestamp, result

  const waitTime = wait || 500

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < waitTime && last > 0) {
      timeout = setTimeout(later, waitTime - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (this: any, ...args: any) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
//深拷贝
export function objectMerge(...args: any): any {
  let options: { [x: string]: any }
  let name: string | number
  let src: any
  let copy: undefined
  let copyIsArray: boolean
  let clone: any[]
  let target = args[0] || {}
  let i = 1
  const length = args.length
  let deep = true
  const obj = {}

  // 是否深层拷贝可以通过第一个参数控制
  if (typeof target === 'boolean') {
    deep = target

    // 往前移，去获取要合并的对象信息
    target = args[i] || {}
    i++
  }

  // 当合并对象为其它类型的值时，则忽略
  if (typeof target !== 'object' && !(typeof target === 'function')) {
    target = {}
  }

  // 当只传了一个参数过来时
  if (i === length) {
    // 当仅传一个参数时
    target = Array.isArray(target) ? [] : {}
    i--
  }

  for (; i < length; i++) {
    // 合并对象必须为非null或者undefined值
    if ((options = args[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 避免循环引用的copy情况
        if (target === copy) {
          continue
        }

        copyIsArray = Array.isArray(copy)

        // 当为数组或者对象时处理深层拷贝
        if (deep && copy && (obj.toString.call(copy) === '[object Object]' || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && obj.toString.call(src) ? src : {}
          }

          // 不要修改原有的数据
          target[name] = objectMerge(deep, clone, copy)

          // undefined值不用传递过去
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // Return the modified object
  return target
}
//数字转中文
export function NumberToChinese(num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    alert('Number is wrong!')
    return 'Number is wrong!'
  }
  var AA: string[] = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
  var BB: string[] = new Array('', '十', '百', '千', '万', '亿', '点', '')
  var a: any[] = ('' + num).replace(/(^0*)/g, '').split('.'),
    k = 0,
    re = ''
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) re = BB[4] + re
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re
    k++
  }
  if (a.length > 1) {
    //加上小数部分(如果有小数部分)
    re += BB[6]
    for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]
  }
  return re.replace('一十', '十')
}
// 转换中文日期
export function transDateFromCh(dateStr: string) {
  if (!dateStr) return false
  if (dateStr.indexOf('年') < 0 || dateStr.indexOf('月') < 0 || dateStr.indexOf('日') < 0)
    return false
  let date = new Date(Date.parse(dateStr.replace('年', '-').replace('月', '-').replace('日', '')))

  return useCommon.moment(date).format('YYYY-MM-DD')
}
// 判断权限
export const hasPermissions = (permission: string[]): boolean => {
  const allPermission = '*:*:*'
  const permissions = getUserInfo()?.resources
  const permissionFlag = permission

  return permissions.some((permission: string) => {
    return allPermission === permission || permissionFlag.includes(permission)
  })
}

//树形结构转为平铺数组
export const convertToFlat = (data: ObjTy[], parentId = null) => {
  return data.reduce((acc, curr) => {
    acc.push({ ...curr, parentId })
    if (curr.children) {
      acc = acc.concat(convertToFlat(curr.children, curr.id))
    }
    return acc
  }, [])
}
