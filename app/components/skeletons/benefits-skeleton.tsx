import { Skeleton } from "@/components/ui/skeleton"

export function BenefitsSkeleton() {
  return (
    <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg p-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  )
}
