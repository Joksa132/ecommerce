import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '../../../prisma/prisma'
import * as jwt from 'jsonwebtoken'

export async function POST(request) {
  const data = await request.json()

  const { email, password } = data

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("user", user)

  if (!user) {
    return NextResponse.json({ error: 'Invalid email address' });
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: "Incorrect password" })
  }

  const token = jwt.sign({
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })

  console.log("token", token);

  return new NextResponse(JSON.stringify('cookie-token'), {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}` }
  })
}