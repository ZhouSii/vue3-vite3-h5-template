// 表格表头样式类型
export type TableHeader = {
  prop: string // 数据字段
  text?: string // 表头名 如果是进度条不用展示
  span: number // 宽度
  align: 'left' | 'center' | 'right' // 对齐方式
  withCircle?: boolean // 是否带小点
  isProgress?: boolean // 是否展示进度条
  tagField?: string // 标签字段
}
