import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { PriceFormatter } from '@/shared/ui'
import { ORDERS_QUERY_RESULT } from '@/sanity.types'
import Image from 'next/image'
import { urlFor } from '@/shared/api/sanity'

interface Props {
  order: ORDERS_QUERY_RESULT[number] | null
  isOpen: boolean
  onClose: () => void
}

const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Date:</strong> {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {item.product.image && (
                    <Image
                      src={urlFor(item.product.image).url()}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="border rounded-sm"
                    />
                  )}

                  {item.product && item.product.name}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter amount={item.product.price} className="text-black font-medium" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <strong>Total: </strong>
          <PriceFormatter amount={order.totalPrice} className="text-black font-bold" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { OrderDetailsDialog }

