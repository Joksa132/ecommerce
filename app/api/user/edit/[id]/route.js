import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma'
import * as jwt from 'jsonwebtoken'

export async function PUT(request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();
  const data = await request.json()
  const { firstName, lastName, address, phone, email } = data

  const updatedUser = await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      firstName,
      lastName,
      address,
      phone,
      email
    }
  })

  const token = jwt.sign({
    userId: updatedUser.id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    address: updatedUser.address,
    phone: updatedUser.phone,
    role: updatedUser.role
  }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })

  return new NextResponse(JSON.stringify({
    userId: updatedUser.id,
    email: updatedUser.email,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    address: updatedUser.address,
    phone: updatedUser.phone,
    role: updatedUser.role
  }), {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}; Max-Age=86400; Path=/;` }
  })
}