import axios from 'axios'

const BASE_URL = 'https://api.escuelajs.co/api/v1'

const get = async (url: string, params?: object): Promise<[]> => {
  const { data } = await axios.get(`${BASE_URL}${url}`, { params })
  return data
}

const api = { get }

export default api
