import { Suspense } from "react";

import Loader from "@/components/loader";
import PostsList from "@/components/posts-list";
import SearchBar from "@/components/search-bar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="flex flex-col gap-8 min-h-screen container mx-auto px-4 md:px-8">
      {/* Search & Category & Sort */}
      <Suspense fallback={<Loader />}>
        <div className="flex  ">
          <SearchBar />
        </div>
      </Suspense>

      {/* Blog Posts */}
      <div className="flex flex-col gap-8 flex-1">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Suspense fallback={<Loader />}>
          <PostsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
