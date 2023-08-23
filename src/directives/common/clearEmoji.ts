import { debounce } from '@/utils/core'

let ele: any = null

const findInput = (el) => {
  const element = Array.from(el.classList).includes('van-cell')
    ? el.querySelector('input') || el.querySelector('textarea')
    : el

  return element
}

const handleInput = debounce(() => {
  console.log('xxxl:', ele.value)

  const inputValue = ele.value

  console.log('inputValue:', inputValue)

  const emojiRegex =
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u203C|\u2049|#\u20E3|\u00A9|\u00AE|[\u2000-\u3300]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF]|[\u2600-\u26FF]|\u2700-\u27BF/g // 正则表达式用于匹配表情符号
  ele.value = inputValue.replace(emojiRegex, '')
}, 300)

export default {
  mounted(el, binding) {
    const element = findInput(el)
    ele = element
    element.addEventListener('input', handleInput)
  },
  updated(el, binding) {
    const element = findInput(el)
    ele = element
    element.removeEventListener('input', handleInput)
    element.addEventListener('input', handleInput)
  },
  unmounted(el, binding) {
    const element = findInput(el)
    ele = element
    element.removeEventListener('input', handleInput)
  },
}
