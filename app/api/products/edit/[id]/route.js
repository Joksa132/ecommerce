import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function PUT(request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  const formData = await request.formData();
  const product = formData.get("product")
  const parsedProduct = JSON.parse(product)

  const category = await prisma.category.findUnique({
    where: {
      name: parsedProduct.category
    }
  })

  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: parsedProduct.title,
      description: parsedProduct.description,
      price: parsedProduct.price,
      picture: parsedProduct?.image,
      info: parsedProduct.info,
      categories: {
        connect: {
          id: category.id
        }
      }
    }
  })

  return NextResponse.json({ success: true, updatedProduct });
}


/*

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
  */