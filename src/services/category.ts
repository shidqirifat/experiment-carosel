import api from './api'

export type Category = {
  id: number
  name: string
  image: string
}

const getCategories = async (): Promise<Category[]> => {
  const product = await api.get('/categories')
  return product
}

export { getCategories }
