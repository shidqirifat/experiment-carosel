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
import { TableProps, skeletons, tableHeaders } from './data'
import { EmptyRow, HeaderSortItem, SkeletonRow } from './Table'
import { toCurrency } from '../../../utils/currency'

export default function TableWrapper({
  products,
  isLoading,
  sort,
  onSort,
}: TableProps) {
  return (
    <Table classNameWrapper="max-h-[660px] h-auto mb-6">
      <TableHeader className="sticky top-0 bg-white">
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header.name} className={header.className}>
              {header.isSorting ? (
                // @ts-ignore
                <HeaderSortItem sort={sort} onSort={onSort}>
                  {header.name}
                </HeaderSortItem>
              ) : (
                header.name
              )}
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
              <TableCell>{toCurrency(product.price)}</TableCell>
              <TableCell className="max-w-md">{product.description}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
