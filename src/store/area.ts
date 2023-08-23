import coreApi from '@/service/api/core'
import { isEmptyArray } from '@/utils/is'
import { defineStore } from 'pinia'
import { ObjTy } from '~/common'

// 格式化显示
const transformText = (data: Array<ObjTy>, type = 'country', isLeaf = false) => {
  // const labelMap = { country: 'countryName', province: 'name', city: 'cityName', area: 'name' }
  const valueMap = {
    country: 'countryId',
    province: 'provinceId',
    city: 'cityId',
    area: 'districtId',
  }

  return data.map((item) => {
    return {
      text: type === 'country' ? item.nameShort : item.name || item.cityName,
      value: item[valueMap[type]],
      children: isLeaf ? null : [],
    }
  })
}

export const useAreaStore = defineStore({
  id: 'area',
  state: (): ObjTy => ({
    country: [] as any,
    province: new Map(),
    city: new Map(),
    area: new Map(),
  }),
  getters: {
    // country: (state) => state.country,
    // province: (state) => state.province,
    // city: (state) => state.city,
    // area: (state) => state.area,
  },
  actions: {
    async getCountry() {
      if (!isEmptyArray(this.country)) {
        return this.country
      }
      const { data } = await coreApi.getCountry()
      this.country = transformText(data)
      return this.country
    },
    async getProvince(countryId: number) {
      if (this.province.has(countryId)) {
        return this.province.get(countryId)
      }
      const { data } = await coreApi.getProvince({ equalCountryId: countryId })
      this.province.set(countryId, transformText(data, 'province'))
      return this.province.get(countryId)
    },
    async getCity(provinceId: number, isLeaf?: boolean) {
      if (this.city.has(provinceId)) {
        return this.city.get(provinceId)
      }
      const { data } = await coreApi.getCity({ equalProvinceId: provinceId })
      this.city.set(provinceId, transformText(data, 'city', isLeaf))
      return this.city.get(provinceId)
    },
    async getArea(city: number, isLeaf?: boolean) {
      if (this.area.has(city)) {
        return this.area.get(city)
      }
      const { data } = await coreApi.getArea({ equalCityId: city })
      this.area.set(city, transformText(data, 'area', isLeaf))
      return this.area.get(city)
    },
  },
})

export default useAreaStore
