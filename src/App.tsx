import FilterDashboard from './components/dashboard/filter/FilterDashboard'
import { useState } from 'react'
import {
  Filter,
  Filters,
  initialFilter,
} from './components/dashboard/filter/type'
import { TableProduct } from './components/dashboard/table/TableProduct'
import CaroselWrapper from './components/carosel/CaroselWrapper'

function App() {
  const [filter, setFilter] = useState<Filters>(initialFilter)

  const handleRemove = (field: Filter): void => {
    setFilter((prev) => ({ ...prev, [field]: { label: '', value: undefined } }))
  }

  const handleSave = (filtered: Filters): void => setFilter(filtered)

  return (
    <div>
      <CaroselWrapper />
      <div className="px-12 mt-12">
        <FilterDashboard
          initialFilter={filter}
          onSave={handleSave}
          onRemove={handleRemove}
        />
        <TableProduct />
      </div>
    </div>
  )
}

export default App
