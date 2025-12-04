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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loader from "./loader";
import { createPost } from "@/lib/post";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getCategories } from "@/lib/category";
import type { CategoryType } from "@/app/types";

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters.")
    .max(100, "Content must be at most 100 characters."),
  categoryId: z.string().min(1, "Category is required"),
});

export default function CreatePostForm() {
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
      console.log(categories);
    };
    fetchCategories();
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      await createPost(data);
      form.reset();
      router.push("/");
      console.log("Post created successfully");
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setSubmitting(false);
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

            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="post-category">Post Category</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {categories.map((category: CategoryType) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            disabled={submitting}
          >
            Reset
          </Button>
          <Button type="submit" form="post-form" disabled={submitting}>
            {submitting ? <Loader message="Submitting..." /> : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
