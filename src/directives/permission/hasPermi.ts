import { isEmptyArray } from '@/utils/is'
import { hasPermissions } from '@/utils/core'

export default {
  mounted(el, binding) {
    const { value } = binding
    if (!isEmptyArray(value)) {
      const permissionFlag = hasPermissions(value)

      if (!permissionFlag) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  },
}
