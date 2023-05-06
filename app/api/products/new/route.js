import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function POST(request) {
  const data = await request.json()

  const { productName, productDesc, productPrice, productCategory, productImage } = data

  const productExists = await prisma.product.findUnique({
    where: {
      title: productName
    }
  })

  if (productExists) {
    return NextResponse.json({ error: 'Same product already exists' });
  }

  const category = await prisma.category.findUnique({
    where: {
      name: productCategory
    }
  })

  if (!category) {
    return NextResponse.json({ error: 'Invalid category' });
  }

  const product = await prisma.product.create({
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

  console.log("Product created")

  return NextResponse.json({ success: true, product });

}