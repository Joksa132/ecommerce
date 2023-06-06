import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function POST(request) {
  const formData = await request.formData();
  const productName = formData.get('productName');
  const productDesc = formData.get('productDesc');
  const productPrice = formData.get('productPrice');
  const productCategory = formData.get('productCategory');
  const productImage = formData.get('productImage')

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
      picture: productImage,
      categories: {
        connect: {
          id: category.id
        }
      }
    }
  })

  return NextResponse.json({ success: true, product });
}