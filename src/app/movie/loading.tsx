
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center gap-10 py-10">
      <div className="flex flex-col gap-6 w-[1080px]">
        <div className="w-full flex justify-between items-end border-b border-zinc-100 pb-4">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-9 w-[400px] rounded-lg" /> {/* Гарчиг */}
            <Skeleton className="h-5 w-[200px]" /> {/* Огноо, хугацаа */}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Skeleton className="w-[290px] h-[428px] rounded-xl flex-shrink-0" />
          <Skeleton className="w-[760px] h-[428px] rounded-xl flex-shrink-0" />
        </div>
      </div>
      <div className="flex flex-col gap-6 w-[1080px]">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
    </div>
  );
}