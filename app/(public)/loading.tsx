import { Skeleton } from '@mui/material'
import { Shell } from '@/components/shells/shell'

export default function PublicPagesLoading() {
    return (
        <Shell className="gap-12">
            <section className="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <Skeleton
                        variant="text"
                        width={300}
                        height={60}
                    />
                    <Skeleton
                        variant="text"
                        width={500}
                        height={24}
                    />
                </div>
            </section>

            <section className="container grid gap-6 pt-6 pb-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden rounded-lg border p-2"
                    >
                        <Skeleton
                            variant="rectangular"
                            height={200}
                        />
                        <div className="p-6">
                            <Skeleton
                                variant="text"
                                width={120}
                                height={24}
                                className="mb-2"
                            />
                            <Skeleton
                                variant="text"
                                width={200}
                                height={16}
                            />
                            <Skeleton
                                variant="text"
                                width={160}
                                height={16}
                            />
                        </div>
                    </div>
                ))}
            </section>
        </Shell>
    )
}
