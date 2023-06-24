import { Product } from '../../../services/product'

export type TableProps = {
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

const tableHeaders = [
  {
    name: 'Image',
    className: 'w-[100px]',
  },
  { name: 'Name' },
  { name: 'Category' },
  { name: 'Price' },
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
