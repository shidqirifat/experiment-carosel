import { RangeValueArr } from '../components/dashboard/filter/type'
import api from './api'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

type FilterKey = {
  category?: string
  rangePrice?: RangeValueArr
  title?: string
  limit: string
  offset: number
}

type ProductKey = {
  queryKey: [string, FilterKey?]
}

type RangePriceResult = { price_min: number; price_max: number }

const defaultRange: RangeValueArr = [0, 2000]

const getMinAndMaxRangePrice = (
  rangePrice = defaultRange
): RangePriceResult => {
  rangePrice.sort((a, b) => a - b)
  const [price_min, price_max] = rangePrice
  return { price_min, price_max }
}

const getFilterFromKey = (keys?: FilterKey) => {
  if (typeof keys === 'object') {
    return {
      title: keys.title,
      categoryId: keys.category,
      limit: keys.limit,
      offset: keys.offset,
      ...getMinAndMaxRangePrice(keys.rangePrice),
    }
  }

  return {
    title: undefined,
    categoryId: undefined,
    limit: '6',
    offset: 0,
    ...getMinAndMaxRangePrice(),
  }
}

const getProducts = async ({ queryKey }: ProductKey): Promise<Product[]> => {
  const query = getFilterFromKey(queryKey[1])
  const product = await api.get('/products', query)
  return product
}

export { getProducts }
