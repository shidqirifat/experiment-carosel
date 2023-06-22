import { Product } from '../../../services/product'
import ProgressiveImage from '../../global/ProgressiveImage'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'

type TableProps = {
  products: Product[]
  isLoading: boolean
}

type EmptyRowProps = { children: string }

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

const EmptyRow = ({ children }: EmptyRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={100} className="text-center py-12 text-base">
        {children}
      </TableCell>
    </TableRow>
  )
}

export default function TableWrapper({ products, isLoading }: TableProps) {
  return (
    <Table classNameWrapper="h-[600px] mb-6">
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
          <EmptyRow>Loading...</EmptyRow>
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
              <TableCell>{product.description}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
