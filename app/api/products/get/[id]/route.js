import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return NextResponse.json({ product })
}