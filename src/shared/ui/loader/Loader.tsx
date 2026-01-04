import loader from '@/public/loader.svg'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-50 bg-white p-10 flex items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <Image src={loader} alt="Loading..." width={140} height={140} priority />
      </div>
    </div>
  )
}

export { Loader }

