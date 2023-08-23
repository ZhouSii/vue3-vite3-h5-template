import { ObjTy } from '~/common'

// 分组分批分堆函数（一堆分10个）
export const averageFn = (arr: ObjTy[]) => {
  let i = 0 // 1. 从第0个开始截取
  const result = [] as any // 2. 定义结果，结果是二维数组
  while (i < arr.length) {
    // 6. 当索引等于或者大于总长度时，即截取完毕
    // 3. 从原始数组的第一项开始遍历
    result.push(arr.slice(i, i + 10)) // 4. 在原有十万条数据上，一次截取10个用于分堆
    i = i + 10 // 5. 这10条数据截取完，再截取下十条数据，以此类推
  }
  return result // 7. 最后把结果丢出去即可
}
