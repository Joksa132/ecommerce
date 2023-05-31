import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function GET(request) {

  const randomProducts = await prisma.product.findMany({
    take: 5,
    orderBy: {
      id: "asc",
    },
    include: {
      categories: true,
    },
  });

  return NextResponse.json({ success: true, randomProducts })
}