import type { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "desc";

  console.log(search, category, sort);

  try {
    const posts = await prisma.post.findMany();

    return Response.json(posts, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, category } = await request.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        category,
      },
    });

    return Response.json(newPost, { status: 201 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}
