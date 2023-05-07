import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function DELETE(request) {
  const { pathname } = new URL(request.url);
  const productId = pathname.split('/').pop();

  const deletedProduct = await prisma.product.delete({
    where: {
      id: parseInt(productId)
    }
  })

  return NextResponse.json({ deletedProduct })
}