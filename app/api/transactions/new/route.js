import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function POST(request) {
  try {
    const data = await request.json()
    const { userId, products } = data

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        products: {
          create: products.map((product) => ({
            productId: product.id,
            title: product.title,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
          }))
        }
      }
    })

    console.log("Transaction created")

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.log(error)
  }
}