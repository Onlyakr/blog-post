import type { PostType } from "@/app/types";
import { getPosts } from "@/lib/post";

import PostCard from "./post-card";
import Link from "next/link";

const PostsList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { search, category, sort } = await searchParams;

  console.log(search, category, sort);

  const posts = await getPosts(search, category, sort);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post: PostType) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <li>
            <PostCard {...post} />
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default PostsList;
