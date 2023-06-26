import { ChangeEvent, useRef, useState } from 'react'
import FilterDashboard from './filter/FilterDashboard'
import TableWrapper from './table/TableWrapper'
import { Filter, Filters } from './filter/type'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedState, useDidUpdate } from '@mantine/hooks'
import { getProducts } from '../../services/product'
import Input from '../ui/input'
import InputOption, { Option } from '../global/InputOption'
import { rows } from './table/data'
import { Pagination } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import {
  generateDefaultFilter,
  generateParamsFromFilter,
  generateQueryKeys,
  waitForKeywordChanged,
} from './utils'
import { initialFilter } from './filter/utils'

export default function Wrapper() {
  const [filter, setFilter] = useState<Filters>(initialFilter)
  const [keyword, setKeyword] = useDebouncedState('', 500)
  const [row, setRow] = useState('10')
  const [page, setPage] = useState(1)
  const [params, setParams] = useSearchParams()
  const refKeyword = useRef<HTMLInputElement>(null)

  const syncFiltersWithParams = () => {
    const queries = generateParamsFromFilter({ keyword, page, filter, row })
    setParams(queries)
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ['table', generateQueryKeys({ keyword, page, filter, row })],
    queryFn: getProducts,
    refetchOnMount: false,
    enabled: waitForKeywordChanged({ page, keyword, refKeyword }),
    onSuccess: syncFiltersWithParams,
  })

  const resetPage = () => setPage(1)

  const handleRemove = (field: Filter) => {
    resetPage()
    setFilter((prev) => ({
      ...prev,
      [field]: generateDefaultFilter(field),
    }))
  }

  const handleClear = () => {
    resetPage()
    setFilter(initialFilter)
  }

  const handleSave = (filtered: Filters) => {
    resetPage()
    setFilter(filtered)
  }

  const handleChangeRow = (selected?: Option) => {
    resetPage()
    setRow(selected?.value || '10')
  }

  const handleTypeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    resetPage()
    setKeyword(e.currentTarget.value)
  }

  useDidUpdate(() => {
    console.log(params.get('page'))
  }, [params])

  // INITIAL FILTER FROM CURRENT URL
  return (
    <div className="px-6 md:px-12 mt-12">
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
        <Input
          ref={refKeyword}
          type="text"
          placeholder="Search by title"
          className="w-[calc(100%-84px)] md:w-80"
          defaultValue={keyword}
          onChange={handleTypeKeyword}
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
