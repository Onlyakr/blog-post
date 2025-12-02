import { cacheTag } from "next/cache";
import PostCard from "./post-card";
import Link from "next/link";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const getPosts = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts: Post[] = await res.json();
  return posts;
};

const PostsList = async () => {
  // "use cache";

  // cacheTag("posts");

  const posts: Post[] = await getPosts();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post: Post) => (
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
