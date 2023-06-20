import ProductCarosel from './components/ProductCarosel'
import ProductHeader from './components/ProductHeader'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from './services/product'

function App() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div>
      <ProductHeader />
      <ProductCarosel products={products || []} />
    </div>
  )
}

export default App
