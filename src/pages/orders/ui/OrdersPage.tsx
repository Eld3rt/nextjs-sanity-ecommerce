import { Container, Button, Card, CardContent, CardHeader, CardTitle, ScrollArea, ScrollBar, Table, TableHead, TableHeader, TableRow } from '@/shared/ui'
import { Orders } from '@/entities/order'
import { FileX } from 'lucide-react'
import Link from 'next/link'
import { ORDERS_QUERY_RESULT } from '@/sanity.types'

interface Props {
  orders: ORDERS_QUERY_RESULT
}

const OrdersPage: React.FC<Props> = ({ orders }) => {
  return (
    <div>
      <Container className="py-10 min-h-screen">
        {orders.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Order List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">Order Number</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <Orders orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <FileX className="h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">No orders found</h2>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              It looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Browse Products</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}

export { OrdersPage }

