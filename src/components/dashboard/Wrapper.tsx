import { useRef, useState } from 'react'
import FilterDashboard from './filter/FilterDashboard'
import TableWrapper from './table/TableWrapper'
import { Filter, Filters, initialFilter } from './filter/type'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedState } from '@mantine/hooks'
import { getProducts } from '../../services/product'
import Input from '../ui/input'
import InputOption, { Option } from '../global/InputOption'
import { rows } from './table/data'
import { Pagination } from '@mantine/core'

export default function Wrapper() {
  const [filter, setFilter] = useState<Filters>(initialFilter)
  const [keyword, setKeyword] = useDebouncedState('', 500)
  const [row, setRow] = useState('10')
  const [page, setPage] = useState(1)
  const refKeyword = useRef<HTMLInputElement>(null)

  const waitForKeywordChanged = (): boolean => {
    console.log('run')
    if (page === 1 && refKeyword.current?.value) {
      return keyword !== ''
    }

    return true
  }

  const { data: products, isLoading } = useQuery({
    queryKey: [
      'table',
      {
        title: keyword,
        offset: (page - 1) * Number(row),
        limit: row,
        category: filter.category.value,
        rangePrice: filter.rangePrice.value,
      },
    ],
    queryFn: getProducts,
    refetchOnMount: false,
    enabled: waitForKeywordChanged(),
  })

  const handleRemove = (field: Filter): void => {
    setPage(1)
    setFilter((prev) => ({ ...prev, [field]: { label: '', value: undefined } }))
  }

  const handleClear = () => {
    setPage(1)
    setFilter(initialFilter)
  }

  const handleSave = (filtered: Filters): void => {
    setPage(1)
    setFilter(filtered)
  }

  const handleChangeRow = (selected?: Option) => {
    setPage(1)
    setRow(selected?.value || '10')
  }

  return (
    <div className="px-12 mt-12">
      <div className="flex gap-4">
        <Input
          ref={refKeyword}
          type="text"
          placeholder="Search by title"
          className="mb-4 w-80"
          defaultValue={keyword}
          onChange={(e) => {
            setPage(1)
            setKeyword(e.currentTarget.value)
          }}
        />
        <FilterDashboard
          initialFilter={filter}
          onSave={handleSave}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </div>
      <TableWrapper products={products || []} isLoading={isLoading} />
      <div className="mb-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3>Show</h3>
          <InputOption
            options={rows}
            value={row}
            onChange={handleChangeRow}
            className="w-20"
          />
          <h3>per page</h3>
        </div>
        <Pagination total={10} siblings={1} value={page} onChange={setPage} />
      </div>
    </div>
  )
}
