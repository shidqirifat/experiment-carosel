import { Product } from '../../../services/product'

interface Sorting {
  sort: SortingType
  onSort: (field: SortingNameType, actionSort: SortingActionType) => void
}

export interface TableProps extends Sorting {
  products: Product[]
  isLoading: boolean
}

export type EmptyRowProps = { children: string }
export type SkeletonRowType = { className?: string; count?: number }

const rows = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '25',
    value: '25',
  },
  {
    label: '50',
    value: '50',
  },
]

type TableHeaderProps = {
  name: string
  className?: string
  isSorting?: boolean
}

export type IconSortProps = {
  sort: SortingType
  label: SortingNameType
}

export type SortingNameType = 'Name' | 'Price'
export interface HeaderItemProps extends Sorting {
  children: SortingNameType
}

export type SortingActionType = 'ASC' | 'DESC'
export type SortingType = [SortingNameType, SortingActionType]

const tableHeaders: Array<TableHeaderProps> = [
  {
    name: 'Image',
    className: 'w-[100px]',
  },
  { name: 'Name', isSorting: true },
  { name: 'Category' },
  { name: 'Price', isSorting: true },
  { name: 'Description' },
]

const skeletons = [
  { className: 'w-14 h-14' },
  { className: 'w-48 h-[18px]' },
  { className: 'w-32 h-[18px]' },
  { className: 'w-28 h-[18px]' },
  { className: 'w-64 h-[18px] mb-1', count: 3 },
]

export { rows, tableHeaders, skeletons }
