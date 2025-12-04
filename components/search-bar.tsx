"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/category";
import type { CategoryType } from "@/app/types";

const SearchBar = () => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({ search, category, sort }).toString();
    router.push(`/?${query}`, {
      scroll: false,
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setSort("");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 ">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search here ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="min-w-60
        "
      />

      {/* Category */}
      <NativeSelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-35"
      >
        <NativeSelectOption value="">Category</NativeSelectOption>
        {categories.map((category: CategoryType) => (
          <NativeSelectOption key={category.id} value={category.id}>
            {category.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      {/* Sort */}
      <NativeSelect
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-25"
      >
        <NativeSelectOption value="">Sort</NativeSelectOption>
        <NativeSelectOption value="desc">Latest</NativeSelectOption>
        <NativeSelectOption value="asc">Oldest</NativeSelectOption>
      </NativeSelect>

      <Button type="submit">Search</Button>

      <Button type="button" variant="secondary" onClick={handleReset}>
        Reset
      </Button>
    </form>
  );
};
export default SearchBar;
