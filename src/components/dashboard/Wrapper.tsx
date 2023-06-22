import React, { useState } from 'react'
import FilterDashboard from './filter/FilterDashboard'
import TableWrapper from './table/TableWrapper'
import { Filter, Filters, initialFilter } from './filter/type'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedState } from '@mantine/hooks'
import { getProducts } from '../../services/product'
import Input from '../ui/input'
import InputOption from '../global/InputOption'
import { rows } from './table/data'

export default function Wrapper() {
  const [filter, setFilter] = useState<Filters>(initialFilter)
  const [row, setRow] = useState('10')
  const [keyword, setKeyword] = useDebouncedState('', 500)

  const { data: products, isLoading } = useQuery({
    queryKey: [
      'table',
      {
        title: keyword,
        limit: row,
        category: filter.category.value,
        rangePrice: filter.rangePrice.value,
      },
    ],
    queryFn: getProducts,
    refetchOnMount: false,
  })

  const handleRemove = (field: Filter): void => {
    setFilter((prev) => ({ ...prev, [field]: { label: '', value: undefined } }))
  }

  const handleClear = () => setFilter(initialFilter)

  const handleSave = (filtered: Filters): void => setFilter(filtered)

  // BUAT PAGINATION
  // BUAT DISPLAY ROW PER PAGE
  return (
    <div className="px-12 mt-12">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search by title"
          className="mb-4 w-80"
          defaultValue={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
        <FilterDashboard
          initialFilter={filter}
          onSave={handleSave}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </div>
      <TableWrapper products={products || []} isLoading={isLoading} />
      <div className="flex items-center gap-3 mb-12">
        <h3>Show</h3>
        <InputOption
          options={rows}
          value={row}
          onChange={(selected) => setRow(selected?.value || '10')}
          className="w-20"
        />
        <h3>per page</h3>
      </div>
    </div>
  )
}
