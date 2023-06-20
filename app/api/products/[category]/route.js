import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'

export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url);
  const category = pathname.split('/').pop();

  const filters = {
    ram: searchParams.get('ram'),
    storage: searchParams.get('storage'),
    display: searchParams.get('display'),
    os: searchParams.get('os'),
    battery: searchParams.get('battery'),
    camera: searchParams.get('camera'),
    processor: searchParams.get('processor')
  }

  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          name: category
        }
      }
    },
    include: {
      categories: true,
    },
  })

  const filteredProducts = products.filter((product) => {
    const info = product.info;
    for (const key in filters) {
      if (filters[key] && info[key] !== filters[key]) {
        return false;
      }
    }
    return true;
  });

  return NextResponse.json({ products: filteredProducts, allProducts: products });
}

/*
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
    },
    include: {
      categories: true,
    },
  })

  return NextResponse.json({ products })
}
*/