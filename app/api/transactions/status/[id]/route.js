import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'

export async function PUT(request) {
  const { pathname } = new URL(request.url);
  const transactionId = pathname.split('/').pop();
  const data = await request.json()
  const { status } = data

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: parseInt(transactionId),
    },
  })

  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: transaction.id,
    },
    data: {
      status,
    },
  });

  const allTransactions = await prisma.transaction.findMany({
    include: {
      user: true,
      products: true,
    },
  });

  return NextResponse.json({ success: true, allTransactions })
}