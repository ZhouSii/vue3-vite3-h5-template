/* eslint-disable max-depth */

import { ObjTy } from '~/common'
import { isEmptyArray } from './is'

// 处理图片路径
export function getImageUrl(name: string) {
  return new URL(`../assets/${name}.png`, import.meta.url).href
}

// 图片格式
export function isAssetTypeAnImage(ext: string) {
  return (
    ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(
      ext.toLowerCase()
    ) !== -1
  )
}
/**
 * 身份证处理
 * @param  idCard
 */
export function getIdCardStar(idCard: string) {
  return idCard.replace(/^(.{2})(?:\d+)(.{2})$/, '$1**************$2')
}

/**
 * 姓名处理
 * @param  realName
 */
export function getNameStr(realName: string) {
  let star = ''
  for (let i = 1; i < realName.length; i++) {
    star += '*'
  }
  realName = realName.replace(/^(.{1})(.*)$/, '$1' + star)

  return realName
}

/**
 * 电话处理
 * @param  tel
 */
export function geTel(tel: string) {
  if (!tel) {
    return ''
  }
  const reg = /^(\d{3})\d{4}(\d{4})$/
  return tel.replace(reg, '$1****$2')
}

/**
 * 从身份证获取生日
 * @param {}} idCard
 */
export function getBirthdayFromIdCard(idCard: string) {
  const birthday =
    idCard.substring(6, 10) + '-' + idCard.substring(10, 12) + '-' + idCard.substring(12, 14)
  return birthday
}

// Parse the time to string
export const parseTime = (
  time?: object | string | number | null,
  cFormat?: string
): string | null => {
  if (time === undefined || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) =>
    filterKeys.map((key: string) => {
      if (key === 'timestamp') {
        return parseTime(data[key])
      }
      return data[key]
    })
  )

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) {
    return (ele.className += ' ' + className)
  }
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

/**
 * ES6: base64编码
 * @param  commonContent
 */

export function encodeBase64Content(commonContent: any): void {
  const base64Content: any = Buffer.from(commonContent).toString('base64')
  return base64Content
}

/**
 * ES6: base64解码
 * @param  commonContent
 */

export function decodeBase64Content(base64Content: any): void {
  let commonContent: any = base64Content.replace(/\s/g, '+')
  commonContent = Buffer.from(commonContent, 'base64').toString()
  return commonContent
}

/**
 * 获取地址栏的参数
 * @param  name
 */
export function getUrlParam(name: any): string | null {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}

/**
 * select数据转换
 * @param  data
 * @param  fieldLabel
 * @param  fieldValue
 */
export function transformCustomFieldName(data: ObjTy[], fieldLabel?: string, fieldValue?: string) {
  return data.map((item: ObjTy) => {
    return {
      ...item,
      text: item[fieldLabel || 'codeName'],
      value: item[fieldValue || 'codeNo'] + '',
    }
  })
}

interface customerType {
  data: ObjTy[] | any
  value: string
  fieldLabel?: string
  fieldValue?: string
}

/**
 * select数据转换
 * @param  name
 */
export function getCustomFieldName(options: customerType) {
  if (!options.data || !options.value) {
    return ''
  }

  const filed = options.data.filter(
    (item: ObjTy) => item[options.fieldValue || 'value'] === options.value
  )

  if (!isEmptyArray(filed)) {
    return filed[0][options.fieldLabel || 'text']
  }

  return ''
}
