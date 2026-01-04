import { twMerge } from 'tailwind-merge'

interface Props {
  amount: number
  className?: string
}

const PriceFormatter: React.FC<Props> = ({ amount, className }) => {
  const formattedPrice = new Number(amount).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 2,
  })
  return <span className={twMerge('text-xs sm:text-sm font-semibold text-darkText', className)}>{formattedPrice}</span>
}

export { PriceFormatter }

