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
