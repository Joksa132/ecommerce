import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma'

export async function GET(request) {
  const categories = await prisma.category.findMany()

  return NextResponse.json({ categories })
}
