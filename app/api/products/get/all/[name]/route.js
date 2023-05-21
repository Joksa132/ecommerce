import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/prisma'

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const name = pathname.split('/').pop();

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: name,
        mode: 'insensitive',
      },
    },
    include: {
      categories: true,
    },
  });

  return NextResponse.json({ success: true, products })
}