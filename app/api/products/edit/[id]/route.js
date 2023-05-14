import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function PUT(request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();
  const data = await request.json()
  const { productName, productDesc, productPrice, productCategory, productImage } = data

  const category = await prisma.category.findUnique({
    where: {
      name: productCategory
    }
  })

  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title: productName,
      description: productDesc,
      price: productPrice,
      //picture: productImage,
      categories: {
        connect: {
          id: category.id
        }
      }
    }
  })

  return NextResponse.json({ success: true, updatedProduct });
}