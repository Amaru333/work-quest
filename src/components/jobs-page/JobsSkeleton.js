import React from "react";
import { Skeleton } from "../ui/skeleton";

export const SkeletonJobCard = () => (
  <div className="rounded-2xl p-1 border border-gray-300 flex flex-col">
    <div className="rounded-xl p-3 flex-1 flex flex-col border border-gray-200">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 rounded-full w-24" />
        <Skeleton className="h-6 rounded-full w-6" />
      </div>
      <Skeleton className="mt-8 h-5 w-20 rounded-2xl" />
      <div className="flex items-center justify-between mt-2 gap-x-2 flex-1">
        <Skeleton className="h-[72px] w-2/3 rounded-2xl" />
        <Skeleton className="h-[72px] w-[72px] rounded-full" />
      </div>
      <div className="flex items-center flex-wrap gap-2 mt-6 mb-4">
        {["", ""].map((_, i) => (
          <Skeleton className="h-[26px] rounded-full w-20" key={i} />
        ))}
      </div>
    </div>
    <div className="px-3 py-4 flex items-center justify-between">
      <div className="w-2/3">
        <Skeleton className="h-7 w-4/5 rounded-2xl" />
        <Skeleton className="h-4 w-1/2 rounded-2xl mt-2" />
      </div>
      <div className="w-1/3">
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export const CheckBoxSkeleton = () => (
  <div className="flex mt-2">
    <Skeleton className="h-4 w-4 rounded-md" />
    <Skeleton className="h-4 w-20 rounded-md ml-2" />
  </div>
);
