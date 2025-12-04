import type { z } from "zod";

import type { formSchema } from "@/components/create-post-form";

export const getPosts = async (
  search?: string,
  category?: string,
  sort?: string
) => {
  const query = new URLSearchParams({
    search: search || "",
    category: category || "",
    sort: sort || "",
  }).toString();

  const res = await fetch(`http://localhost:3000/api/posts?${query}`);
  const posts = await res.json();
  return posts;
};

export const getPost = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const post = await res.json();
  return post;
};

export const createPost = async (data: z.infer<typeof formSchema>) => {
  await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updatePost = async (
  data: z.infer<typeof formSchema>,
  postId: number
) => {
  await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deletePost = async (id: string) => {
  await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
