export default function FeedBackSkeleton() {
  return (
    <div className="w-full animate-pulse mt-10">
      {/* Tabs Skeleton */}
      <div className="flex justify-center gap-8 border-b border-gray-200 mb-8">
        <div className="pb-4 relative">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Review Skeletons - Show 4 by default */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-6 last:border-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar Skeleton */}
                <div className="w-12 h-12 rounded-full bg-gray-200" />

                <div className="space-y-2">
                  {/* Name Skeleton */}
                  <div className="h-5 w-32 bg-gray-200 rounded" />

                  {/* Rating Stars Skeleton */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Date Skeleton */}
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            {/* Comment Skeleton */}
            <div className="ml-[60px] space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>
        ))}

        {/* Load More Button Skeleton */}
        <div className="flex justify-center">
          <div className="h-12 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
