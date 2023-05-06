import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const category = pathname.split('/').pop();

  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          name: category
        }
      }
    }
  })

  console.log(products)

  return NextResponse.json({ products })
}