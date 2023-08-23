declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const content: any
  export default content
}

import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module '*.vue' {
  type HTMLAttributes<T> = AttributifyAttributes
}
