import useClipboard from 'vue-clipboard3'

export default {
  beforeMount(
    el: {
      [x: string]: any
      addEventListener: (arg0: string, arg1: () => Promise<void>) => void
      $destroyCopy: () => any
      removeEventListener: (arg0: string, arg1: () => Promise<void>) => any
    },
    binding: { value: any }
  ) {
    const { value } = binding
    const { toClipboard } = useClipboard()

    const handler = async (event?) => {
      // console.log('event:', event)
      event.stopPropagation()
      try {
        await toClipboard(value) //实现复制
        useVant.vantToastMixin('复制成功', 'success')
      } catch (e) {
        useVant.vantToastMixin('当前不支持复制', 'fail')
      }
    }
    el.addEventListener('click', handler)
    el.$destroyCopy = () => el.removeEventListener('click', handler)
  },
}
