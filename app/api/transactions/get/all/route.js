import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function GET(request) {
  const transactions = await prisma.transaction.findMany({
    include: {
      user: true,
      products: true,
    },
  })

  return NextResponse.json({ transactions })
}