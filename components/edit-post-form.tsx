"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Loader from "./loader";

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters.")
    .max(100, "Content must be at most 100 characters."),
});

const updatePost = async (data: z.infer<typeof formSchema>, postId: number) => {
  await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default function EditPostForm({
  postId,
  initialData,
}: {
  postId: number;
  initialData: { title: string; content: string };
}) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      content: initialData.content || "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setEditing(true);
      await updatePost(data, postId);
      form.reset();
      router.push("/");
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Failed to update post", error);
    } finally {
      setEditing(false);
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="post-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="post-title">Post Title</FieldLabel>
                  <Input
                    {...field}
                    id="post-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Post title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="post-content">Post Content</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="post-content"
                      placeholder="Post content"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value?.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={editing}
          >
            Reset
          </Button>
          <Button type="submit" form="post-form" disabled={editing}>
            {editing ? <Loader message="Editing..." /> : "Update"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
