//global declare file
//let  function  namespace  class ,module
declare let GLOBAL_LET: Array<any>
declare let GLOBAL_STRING: string
declare let onlyOneChild: any

//declare import module
declare module '*/**'
declare module '*'

interface Window {
  uni: any
  bus: any
  _tcTraObj: any
  BMap: any
  BMAP_STATUS_SUCCESS: any
}

declare type Nullable<Type = any> = Type | null
declare type TimeoutHandle = ReturnType<typeof setTimeout>
