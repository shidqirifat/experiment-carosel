const BASE_URL = 'https://api.escuelajs.co/api/v1'

const get = async (url: string): Promise<[]> => {
  const res = await fetch(`${BASE_URL}${url}`)
  const data = await res.json()
  return data
}

const api = { get }

export default api
