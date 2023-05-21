import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const userId = pathname.split('/').pop();

  const transaction = await prisma.transaction.findMany({
    where: {
      userId: parseInt(userId),
    },
    include: {
      products: true,
    },
  })

  return NextResponse.json({ transaction })
}