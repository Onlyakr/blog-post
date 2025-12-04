import type { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    return Response.json(category);
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const { name } = await request.json();

    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    return Response.json(updatedCategory);
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });

    return Response.json(deletedCategory);
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
};
