import React, { useState } from 'react'
import FilterDashboard from './filter/FilterDashboard'
import TableWrapper from './table/TableWrapper'
import { Filter, Filters, initialFilter } from './filter/type'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/product'

export default function Wrapper() {
  const [filter, setFilter] = useState<Filters>(initialFilter)

  const { data: products } = useQuery({
    queryKey: [
      'table',
      { category: filter.category.value, rangePrice: filter.rangePrice.value },
    ],
    queryFn: getProducts,
  })

  const handleRemove = (field: Filter): void => {
    setFilter((prev) => ({ ...prev, [field]: { label: '', value: undefined } }))
  }

  const handleClear = () => {
    setFilter(initialFilter)
  }

  const handleSave = (filtered: Filters): void => setFilter(filtered)

  return (
    <div className="px-12 mt-12">
      <FilterDashboard
        initialFilter={filter}
        onSave={handleSave}
        onRemove={handleRemove}
        onClear={handleClear}
      />
      <TableWrapper products={products || []} />
    </div>
  )
}
