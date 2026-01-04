'use client'

import { useState } from 'react'
import { TableBody, TableCell, TableRow } from '@/shared/ui/table'
import { PriceFormatter } from '@/shared/ui'
import { ORDERS_QUERY_RESULT } from '@/sanity.types'
import { OrderDetailsDialog } from './OrderDetailsDialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

interface Props {
  orders: ORDERS_QUERY_RESULT
}
const Orders: React.FC<Props> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<ORDERS_QUERY_RESULT[number] | null>(null)

  const handleOrderClick = (order: ORDERS_QUERY_RESULT[number]) => {
    setSelectedOrder(order)
  }
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map(order => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow className="cursor-pointer hover:bg-gray-100 h-12" onClick={() => handleOrderClick(order)}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden sm:table-cell">{order.email}</TableCell>
                  <TableCell>
                    <PriceFormatter amount={order.totalPrice} className="text-black font-medium" />
                  </TableCell>
                  <TableCell>
                    {order.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  )
}

export { Orders }

