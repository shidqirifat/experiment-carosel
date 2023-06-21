import ProductCarosel from './components/product/ProductCarosel'
import ProductHeader from './components/product/ProductHeader'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from './services/product'
import FilterDashboard from './components/dashboard/filter/FilterDashboard'
import { useState } from 'react'
import {
  Filter,
  Filters,
  initialFilter,
} from './components/dashboard/filter/type'

function App() {
  const [filter, setFilter] = useState<Filters>(initialFilter)

  const handleRemove = (field: Filter): void => {
    setFilter((prev) => ({ ...prev, [field]: { label: '', value: undefined } }))
  }

  const handleSave = (filtered: Filters): void => setFilter(filtered)

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div>
      <ProductHeader />
      <ProductCarosel products={products || []} />
      <div className="px-12 mt-12">
        <FilterDashboard
          initialFilter={filter}
          onSave={handleSave}
          onRemove={handleRemove}
        />
      </div>
    </div>
  )
}

export default App
