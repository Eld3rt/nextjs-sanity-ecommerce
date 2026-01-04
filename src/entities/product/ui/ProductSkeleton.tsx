const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-130 sm:h-110 bg-gray-200 rounded" />
      ))}
    </div>
  )
}

export { ProductSkeleton }

