import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div>
      <Skeleton className="h-6 w-48" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="w-[calc(40%-0.5rem)] md:w-[calc(20%-0.5rem)] p-2"
            key={index}
          >
            <div className="flex-1">
              <div className="pt-2">
                <Skeleton className="h-40 md:h-60 mb-2" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="h-6 w-[60%] my-3" key={index} />
      ))}
    </div>
  );
}
