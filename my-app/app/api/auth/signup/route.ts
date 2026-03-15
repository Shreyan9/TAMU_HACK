import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getDb, USERS_COLLECTION } from '@/lib/mongodb'
import { createVerificationToken, sendVerificationEmail } from '@/lib/emailVerification'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const col = db.collection(USERS_COLLECTION)
    const existing = await col.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await col.insertOne({
      email: email.toLowerCase(),
      passwordHash,
      name: name?.trim() || null,
      emailVerified: false,
      createdAt: new Date(),
    })

    const token = await createVerificationToken(result.insertedId, email.toLowerCase())
    await sendVerificationEmail(email.toLowerCase(), token)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
