import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '../../../../prisma/prisma'

export async function POST(request) {

  const data = await request.json()
  console.log(data)

  const { firstName, lastName, address, phone, email, password } = data;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return NextResponse.json({ error: 'Email address already in use' });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      address,
      phone,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true, user });
}