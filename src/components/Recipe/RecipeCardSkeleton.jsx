"use client";

const RecipeCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full bg-gray-200" />

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {/* Tags Skeleton */}
        <div className="mb-2.5 flex gap-1.5">
          <div className="h-5 w-12 rounded-full bg-gray-200" />
          <div className="h-5 w-12 rounded-full bg-gray-200" />
        </div>

        {/* Title Skeleton */}
        <div className="h-6 w-3/4 rounded bg-gray-200" />

        {/* Description Skeleton */}
        <div className="mt-2 space-y-1.5">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Meta Skeleton */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex gap-3">
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="h-3 w-16 rounded bg-gray-200" />
          </div>
          <div className="h-3 w-12 rounded bg-gray-200" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-4 h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
