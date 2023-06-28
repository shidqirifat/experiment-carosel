import { Filter, Filters } from './filter/type'
import { defaultRangePrice } from './filter/utils'
import { SortingType } from './table/data'

type KeywordChangedType = {
  page: number
  refKeyword: React.RefObject<HTMLInputElement>
  keyword: string
}

type FilterType = {
  keyword: string
  page: number
  row: string
  filter: Filters
  sort: SortingType
}

export type QueriesUrl = {
  category_id: string
  category_label: string
  price_min: string
  price_max: string
  row: string
  page: string
  keyword: string
  sort_field: string
  sort_action: string
}

const generateDefaultFilter = (field: Filter) => {
  if (field === 'category') return { label: '', value: undefined }

  return {
    label: '0 - 2000',
    value: defaultRangePrice,
  }
}

const waitForKeywordChanged = ({
  page,
  refKeyword,
  keyword,
}: KeywordChangedType) => {
  if (page === 1 && refKeyword.current?.value) return keyword !== ''

  return true
}

const generateQueryKeys = ({
  keyword,
  page,
  row,
  filter,
  sort,
}: FilterType) => {
  return {
    title: keyword,
    offset: (page - 1) * Number(row),
    limit: row,
    category: filter.category.value || '',
    rangePrice: filter.rangePrice.value,
    sortField: sort[0].toLowerCase(),
    sortAction: sort[1].toLowerCase(),
  }
}

const generateParamsFromFilter = ({
  keyword,
  page,
  row,
  filter,
  sort,
}: FilterType) => {
  const queries: QueriesUrl = {
    category_id: filter.category.value || '',
    category_label: filter.category.label,
    price_min: filter.rangePrice.value[0].toString(),
    price_max: filter.rangePrice.value[1].toString(),
    sort_field: sort[0].toLowerCase(),
    sort_action: sort[1].toLowerCase(),
    row,
    page: page.toString(),
    keyword,
  }

  let query: keyof typeof queries
  for (query in queries) {
    if (!queries[query]) delete queries[query]
  }

  return queries
}

export {
  generateDefaultFilter,
  waitForKeywordChanged,
  generateQueryKeys,
  generateParamsFromFilter,
}
