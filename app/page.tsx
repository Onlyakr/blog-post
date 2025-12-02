import { Suspense } from "react";

import Loader from "@/components/loader";
import PostsList from "@/components/posts-list";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen container mx-auto px-4 md:px-8">
      {/* Blog Posts */}
      <div className="flex flex-col gap-8 flex-1">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Suspense fallback={<Loader />}>
          <PostsList />
        </Suspense>
      </div>
    </div>
  );
}
