import { Option } from '../../global/InputOption'

export type ClearType = { onClear: () => void }

export type RemoveType = { onRemove: () => void }

export type ButtonRemoveType = {
  children: ActiveFilterItem
  onRemove: (field: Filter) => void
}

export type ActiveFilterType = {
  children: ActiveFilterItem[]
  onRemove: (field: Filter) => void
  onClear: () => void
}

export type RangeValueArr = [number, number]

export type Range = {
  label: string
  value: RangeValueArr
}

export type Filters = {
  category: Option
  rangePrice: Range
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

export type FilterRangeType = {
  label: string
  value: RangeValueArr
  marks: { value: number; label: string }[]
  onChange: (value: RangeValueArr) => void
  step?: number
  max?: number
}

const defaultRangePrice: RangeValueArr = [0, 2000]

const initialFilter: Filters = {
  category: { label: '', value: undefined },
  rangePrice: { label: '0 - 2000', value: defaultRangePrice },
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
  { value: 0, label: '0' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' },
  { value: 1500, label: '1500' },
  { value: 2000, label: '2000' },
]

export { categories, rangePrice, initialFilter, resetFilter, defaultRangePrice }
