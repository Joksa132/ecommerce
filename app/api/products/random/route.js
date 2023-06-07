import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function GET(request) {

  const products = await prisma.product.findMany({
    include: {
      categories: true,
    },
  });

  const randomProducts = shuffleArray(products).slice(0, 5);

  return NextResponse.json({ success: true, randomProducts })
}

function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}