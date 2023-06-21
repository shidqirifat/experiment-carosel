import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonCard() {
  return (
    <div>
      <Skeleton className="aspect-square" />
      <Skeleton className="mt-4 w-3/6" height={20} />
      <Skeleton className="mt-2 w-11/12" />
      <Skeleton className="w-5/6" />
      <Skeleton className="w-2/6" height={14} />
    </div>
  )
}
