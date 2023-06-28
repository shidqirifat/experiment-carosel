import Skeleton from 'react-loading-skeleton'
import {
  EmptyRowProps,
  HeaderItemProps,
  IconSortProps,
  SkeletonRowType,
} from './data'
import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import { TableCell, TableRow } from '../../ui/table'
import { fakeArray } from '../../../utils/array'

const IconSort = ({ sort, label }: IconSortProps) => {
  if (sort[0] === label) {
    if (sort[1] === 'DESC') return <ChevronDownIcon />
    return <ChevronUpIcon />
  }

  return <CaretSortIcon />
}

const HeaderSortItem = ({ children, sort, onSort }: HeaderItemProps) => {
  const handleSort = () => {
    if (children !== sort[0]) onSort(children, 'ASC')

    const nextSort = sort[1] === 'ASC' ? 'DESC' : 'ASC'
    onSort(children, nextSort)
  }

  return (
    <button
      onClick={handleSort}
      className="flex gap-2 items-center hover:bg-gray-100 px-3 py-2 rounded-md transition"
    >
      <h3>{children}</h3>
      <IconSort sort={sort} label={children} />
    </button>
  )
}

const EmptyRow = ({ children }: EmptyRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={100} className="text-center py-12 text-base">
        {children}
      </TableCell>
    </TableRow>
  )
}

const SkeletonRow = ({ className, count = 1 }: SkeletonRowType) => {
  return (
    <TableCell>
      {fakeArray(count).map((item) => (
        <Skeleton key={item} className={className} />
      ))}
    </TableCell>
  )
}

export { EmptyRow, HeaderSortItem, IconSort, SkeletonRow }
