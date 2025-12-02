"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

import Link from "next/link";
import { useState } from "react";
import Loader from "./loader";

const deletePost = async (id: string) => {
  await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

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
