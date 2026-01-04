'use client'

import { urlFor } from '@/shared/api/sanity'
import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Badge, Button } from '@/shared/ui'
import { Sale } from '@/sanity.types'

interface Props {
  sales: Sale[]
}

const DiscountBanner: React.FC<Props> = ({ sales }) => {
  const scrollToProducts = () => {
    const el = document.getElementById('category-selector')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Carousel className="w-full max-w-(--breakpoint-xl) mx-auto mt-10 md:mb-5">
      <CarouselContent>
        {sales.map(sale => (
          <CarouselItem key={sale._id}>
            <Card className="overflow-hidden select-none">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 p-6 md:px-12 w-full">
                    <Badge variant="secondary" className="mb-2 md:mb-4 text-lightOrange capitalize">
                      {sale.badge} {sale.discountAmount}% off
                    </Badge>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-4">
                      {sale.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{sale.description}</p>
                    <p className="mb-4">
                      Use code: <span className="font-semibold text-primary uppercase">{sale.couponCode}</span> for{' '}
                      <span className="font-semibold">{sale.discountAmount}%</span> OFF
                    </p>
                    <Button className="cursor-pointer" onClick={scrollToProducts}>
                      Shop Now
                    </Button>
                  </div>

                  {sale.image && (
                    <div className="w-full md:w-1/2 h-auto relative flex items-center justify-center py-2">
                      <img
                        src={urlFor(sale.image).size(1000, 1000).url()}
                        alt={'bannerImage'}
                        className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  )
}

export { DiscountBanner }

