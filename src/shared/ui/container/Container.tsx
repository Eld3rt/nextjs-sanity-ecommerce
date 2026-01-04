import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={twMerge('max-w-(--breakpoint-xl) mx-auto px-4', className)}>{children}</div>
}

export { Container }

