export class ApiRo<T> {
  code: string
  msg?: string
  data?: T
}

export class GridRo<T> {
  //总页数
  total: number
  //数据总数
  records: number
  //具体的数据
  rows: T[]
}
