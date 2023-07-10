import { ChangeEvent, useEffect, useRef, useState } from 'react'
import FilterDashboard from './filter/FilterDashboard'
import TableWrapper from './table/TableWrapper'
import { Filter, Filters, RangeValueArr } from './filter/type'
import { useQuery } from '@tanstack/react-query'
import { useDebouncedState, useDidUpdate } from '@mantine/hooks'
import { getProducts } from '../../services/product'
import Input from '../ui/input'
import InputOption, { Option } from '../global/InputOption'
import {
  SortingActionType,
  SortingNameType,
  SortingType,
  rows,
} from './table/data'
import { Pagination } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import {
  generateDefaultFilter,
  generateParamsFromFilter,
  generateQueryKeys,
} from './utils'
import { generateActiveLabelRangePrice, initialFilter } from './filter/utils'
import { queryUrlToObject } from '../../utils/url'
import Container from '../global/Container'
import useReady from '../../hooks/useReady'

export default function Wrapper() {
  const [filter, setFilter] = useState<Filters>(initialFilter)
  const [keyword, setKeyword] = useDebouncedState('', 200)
  const [row, setRow] = useState('10')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortingType>(['Name', 'ASC'])
  const [params, setParams] = useSearchParams()
  const refKeyword = useRef<HTMLInputElement>(null)
  const { ready, resetReady } = useReady(200, [
    filter,
    keyword,
    row,
    page,
    sort,
  ])

  const syncFiltersWithParams = () => {
    const queries = generateParamsFromFilter({
      keyword,
      page,
      filter,
      row,
      sort,
    })
    setParams(queries)
  }

  const { data: products, isLoading } = useQuery({
    queryKey: [
      'table',
      generateQueryKeys({ keyword, page, filter, row, sort }),
    ],
    queryFn: getProducts,
    refetchOnMount: false,
    enabled: ready,
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

  const handleSort = (
    field: SortingNameType,
    actionSort: SortingActionType
  ) => {
    resetPage()
    setSort([field, actionSort])
  }

  useEffect(() => {
    const queryObject = queryUrlToObject(params.toString())
    if (Object.keys(queryObject).length === 0) return

    const rangePrice: RangeValueArr = [
      Number(queryObject.price_min),
      Number(queryObject.price_max),
    ]

    setFilter({
      category: {
        label: queryObject.category_label || '',
        value: queryObject.category_id || undefined,
      },
      rangePrice: {
        label: generateActiveLabelRangePrice(rangePrice),
        value: rangePrice,
      },
    })

    setRow(queryObject.row.toString())
    setPage(Number(queryObject.page))
    setKeyword(queryObject.keyword || '')
    if (refKeyword.current) refKeyword.current.value = queryObject.keyword || ''
  }, [])

  useDidUpdate(() => {
    syncFiltersWithParams()
    resetReady()
  }, [products])

  return (
    <Container>
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
      <TableWrapper
        products={products || []}
        isLoading={isLoading}
        sort={sort}
        onSort={handleSort}
      />
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
        <Pagination
          color="dark"
          total={10}
          siblings={1}
          value={page}
          onChange={setPage}
        />
      </div>
    </Container>
  )
}
