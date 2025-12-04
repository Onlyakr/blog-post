import type { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return Response.json(categories);
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { name } = await request.json();

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return Response.json(newCategory, { status: 201 });
  } catch (error) {
    const e = error as Error;
    return Response.json({ error: e.message }, { status: 500 });
  }
};
