"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { deletePost } from "@/lib/post";

import Link from "next/link";
import Loader from "./loader";

const ActionButton = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      await deletePost(id);
      router.push("/");
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Button variant="outline" asChild>
        <Link href={`/posts/${id}/edit`}>Edit</Link>
      </Button>
      <Button
        variant="destructive"
        className="cursor-pointer"
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader message="Deleting..." /> : "Delete"}
      </Button>
    </div>
  );
};
export default ActionButton;
