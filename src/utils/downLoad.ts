import axios from 'axios'

import { getToken } from '@/utils/auth'

//将链接转化为arraybuffer文件流格式
function getFile(url: string, responseType: any = 'blob'): Promise<any> {
  const token = getToken()
  const baseUrl = import.meta.env.VITE_APP_IMAGE_URL + url
  // const baseUrl = 'http://edu.jiuweiedu.com:81' + url
  // console.log("baseApi=====", baseApi)
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: baseUrl,
      responseType,
      // responseType: 'arraybuffer',
      headers: {
        Authorization: 'Bearer ' + token,
        // Authorization: 'Bearer ' + 'a33f7467-2f3d-42d6-9bd9-8c092dfe43da',
      },
    })
      .then((data) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error.toString())
      })
  })
}

//单文件下载
export function singleFile(url: string, fileName: string, type = 'application/pdf'): Promise<any> {
  return new Promise((resolve, reject) => {
    getFile(url)
      .then(async (data) => {
        blobDownloadFile(data, type, fileName)
        resolve('200')
      })
      .catch((error) => {
        reject(error.toString())
      })
  })
}

export function blobDownloadFile(res: any, type: string, fileName: string) {
  const blob = new Blob([res], { type: type })
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob) //创建下载的链接
  downloadElement.href = href
  downloadElement.download = fileName //下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() //点击下载
  document.body.removeChild(downloadElement) //下载完成移除元素
  window.URL.revokeObjectURL(href) //释放掉blob对象
}
