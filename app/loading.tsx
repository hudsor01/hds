'use client'

export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="animate-pulse">
                {/* Loading placeholder for header */}
                <div className="mb-8 h-10 w-[200px] rounded bg-gray-200 dark:bg-gray-700" />

                {/* Loading placeholders for content */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
