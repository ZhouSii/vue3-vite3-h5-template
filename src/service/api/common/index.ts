import http from '@/service/http'
import * as T from './types'
import { parseTime } from '@/utils/'

const xFileBucket = `exercise/homework/student/ipad/${parseTime(new Date(), '{y}-{m}-{d}')}`

const commonApi: T.CommonApi = {
  uploadFile(data, fileBucket = xFileBucket) {
    return http({
      url: '/api-sysfile/sys/file/uploadFile',
      method: 'post',
      headers: {
        'x-file-bucket': fileBucket,
      },
      isUploadFile: true,
      data,
    })
  },
}

export default commonApi
