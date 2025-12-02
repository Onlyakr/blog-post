import type { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return Response.json(post, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, content, category } = await request.json();

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, category },
    });

    return Response.json(updatedPost, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return Response.json(deletedPost, { status: 200 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
}
