/*
 * 埋点方法
 * category--类别, action--操作, label--标签(可选), value--值(字符串)
 * eventId--事件ID, startTime: 开始时间,用于计算耗时(可选)
 */
import { isEmptyObject } from '@/utils/is'
import { ObjTy } from '~/common'

interface trackEventParams {
  category: string
  action: string
  label: string
  value?: ObjTy
  eventId?: number
  startTime?: number
}

const useTrack = ({
  category,
  action,
  label,
  value = {},
  eventId,
  startTime,
}: trackEventParams): void => {
  if (startTime) {
    value.costTime = new Date().getTime() - startTime
  }

  let valueStr = ''
  if (!isEmptyObject(value)) {
    for (const key in value) {
      valueStr += `${key}:${value[key]}^`
    }
  }
  if (window._tcTraObj) {
    console.log('触发埋点:')
    window._tcTraObj._tcTrackEventNew(category, action, label, valueStr, eventId || 0)
  }
}

export { useTrack }
