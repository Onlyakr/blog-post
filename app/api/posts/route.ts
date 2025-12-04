import type { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("category");
  const sort = searchParams.get("sort") || "desc";

  const whereCondition = categoryId
    ? {
        title: {
          contains: search,
          mode: "insensitive",
        },
        categoryId: Number(categoryId),
      }
    : {
        title: {
          contains: search,
          mode: "insensitive",
        },
      };

  try {
    const posts = await prisma.post.findMany({
      where: whereCondition as any,
      orderBy: {
        createdAt: sort,
      } as any,
      include: {
        category: true,
      },
    });

    return Response.json(posts, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, categoryId } = await request.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        categoryId: Number(categoryId),
      },
    });

    return Response.json(newPost, { status: 201 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}
