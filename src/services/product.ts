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

const getProducts = async (): Promise<Product[]> => {
  const product = await api.get('/products?offset=0&limit=6')
  return product
}

export { getProducts }
