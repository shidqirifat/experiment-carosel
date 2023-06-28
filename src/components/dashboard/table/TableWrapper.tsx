import Skeleton from 'react-loading-skeleton'
import ProgressiveImage from '../../global/ProgressiveImage'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { fakeArray } from '../../../utils/array'
import {
  EmptyRowProps,
  SkeletonRowType,
  TableProps,
  skeletons,
  tableHeaders,
} from './data'

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

export default function TableWrapper({ products, isLoading }: TableProps) {
  return (
    <Table classNameWrapper="max-h-[660px] h-auto mb-6">
      <TableHeader className="sticky top-0 bg-white">
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header.name} className={header.className}>
              {header.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          fakeArray(8).map((item) => (
            <TableRow key={item}>
              {skeletons.map((skeleton) => (
                <SkeletonRow
                  key={skeleton.className}
                  className={skeleton.className}
                  count={skeleton.count}
                />
              ))}
            </TableRow>
          ))
        ) : products.length === 0 ? (
          <EmptyRow>There is no product</EmptyRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <ProgressiveImage src={product.images[0]} alt={product.title} />
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="max-w-md">{product.description}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
