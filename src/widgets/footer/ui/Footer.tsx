import { Container } from '@/shared/ui'
import Image from 'next/image'
import payment from '@/public/payment.png'

const Footer = () => {
  return (
    <div className="bg-lightBg text-sm">
      <Container className="py-5">
        <footer className="flex items-center justify-between flex-wrap gap-y-[1rem]">
          <p className="text-gray-500">Copyright © 2025 All rights reserved.</p>
          <Image src={payment} alt="payment" className="w-64 object-cover" />
        </footer>
      </Container>
    </div>
  )
}

export { Footer }

