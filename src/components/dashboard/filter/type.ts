import { Option } from './FilterItem'

export type Filters = {
  category: Option
  rangePrice: Option
}

export type ActiveFilterItem = {
  field: Filter
  label: string
}

export type Filter = 'category' | 'rangePrice'

export type FilterDashboardProps = {
  initialFilter: Filters
  onSave: (filter: Filters) => void
  onRemove: (field: Filter) => void
  onClear: () => void
}

const initialFilter = {
  category: { label: '', value: undefined },
  rangePrice: { label: '', value: undefined },
}

const resetFilter = () => initialFilter

const categories = [
  {
    label: 'Category 1',
    value: 'category-1',
  },
  {
    label: 'Category 2',
    value: 'category-2',
  },
  {
    label: 'Category 3',
    value: 'category-3',
  },
]

const rangePrice = [
  {
    label: '0 - 99',
    value: '0 - 99',
  },
  {
    label: '100 - 999',
    value: '100 - 999',
  },
  {
    label: '1000 - 10000',
    value: '1000 - 10000',
  },
]

export { categories, rangePrice, initialFilter, resetFilter }
