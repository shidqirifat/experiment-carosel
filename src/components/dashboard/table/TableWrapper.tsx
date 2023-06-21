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
}

export default function TableWrapper({ products }: TableProps) {
  return (
    <Table className="mb-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <ProgressiveImage src={product.images[0]} alt={product.title} />
            </TableCell>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
