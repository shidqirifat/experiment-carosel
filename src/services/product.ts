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

type FilterKey = { category?: string; rangePrice?: string; title?: string }

type ProductKey = {
  queryKey: [string, FilterKey?]
}

type RangePrice = { price_min?: string; price_max?: string }

const getMinAndMaxRangePrice = (rangePrice = ''): RangePrice => {
  if (rangePrice === '') {
    return { price_min: undefined, price_max: undefined }
  }

  const priceArr = rangePrice.split(' ')
  return { price_min: priceArr[0], price_max: priceArr[2] }
}

const getFilterFromKey = (keys?: FilterKey) => {
  if (typeof keys === 'object') {
    return {
      title: keys.title,
      category: keys.category,
      ...getMinAndMaxRangePrice(keys.rangePrice),
    }
  }

  return {
    title: undefined,
    category: undefined,
    ...getMinAndMaxRangePrice(''),
  }
}

const getProducts = async ({ queryKey }: ProductKey): Promise<Product[]> => {
  const { title, category, price_min, price_max } = getFilterFromKey(
    queryKey[1]
  )
  const product = await api.get('/products', {
    offset: 0,
    limit: 6,
    title,
    categoryId: category,
    price_min,
    price_max,
  })
  return product
}

export { getProducts }
