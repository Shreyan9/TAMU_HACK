import { getDb, USERS_COLLECTION } from './mongodb'
import { Resend } from 'resend'
import type { ObjectId } from 'mongodb'
import crypto from 'crypto'

const VERIFICATION_EXPIRY_HOURS = 24

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function createVerificationToken(userId: ObjectId, email: string): Promise<string> {
  const db = await getDb()
  const token = generateToken()
  const expires = new Date()
  expires.setHours(expires.getHours() + VERIFICATION_EXPIRY_HOURS)

  await db.collection(USERS_COLLECTION).updateOne(
    { _id: userId },
    {
      $set: {
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      },
    }
  )
  return token
}

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`

  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
      const { error } = await resend.emails.send({
        from,
        to: email,
        subject: 'Verify your FinSight email',
        html: `
          <p>Thanks for signing up for FinSight.</p>
          <p>Click the link below to verify your email:</p>
          <p><a href="${verifyUrl}">${verifyUrl}</a></p>
          <p>This link expires in ${VERIFICATION_EXPIRY_HOURS} hours.</p>
        `,
      })
      if (error) {
        console.error('Resend error:', error)
        return false
      }
      return true
    } catch (e) {
      console.error('Send verification email error:', e)
      return false
    }
  }

  // No API key: log link in dev (don't send email)
  console.log('[FinSight] Verification link (no RESEND_API_KEY):', verifyUrl)
  return true
}

export async function resendVerificationEmail(email: string): Promise<{ ok: boolean; error?: string }> {
  const db = await getDb()
  const normalized = email.toLowerCase().trim()
  const user = await db.collection(USERS_COLLECTION).findOne({ email: normalized })
  if (!user) return { ok: false, error: 'No account found with this email.' }
  if (user.emailVerified) return { ok: false, error: 'This email is already verified. You can sign in.' }

  const token = await createVerificationToken(user._id, normalized)
  const sent = await sendVerificationEmail(normalized, token)
  if (!sent) return { ok: false, error: 'Failed to send email. Please try again later.' }
  return { ok: true }
}

export async function verifyEmailToken(token: string): Promise<{ ok: boolean; error?: string }> {
  if (!token) return { ok: false, error: 'Invalid link' }

  const db = await getDb()
  const user = await db.collection(USERS_COLLECTION).findOne({
    emailVerificationToken: token,
  })

  if (!user) return { ok: false, error: 'Invalid or expired link' }
  if (user.emailVerified) return { ok: true } // already verified

  const expires = user.emailVerificationExpires
  if (expires && new Date() > new Date(expires)) {
    return { ok: false, error: 'Link has expired' }
  }

  await db.collection(USERS_COLLECTION).updateOne(
    { _id: user._id },
    {
      $set: { emailVerified: true },
      $unset: {
        emailVerificationToken: '',
        emailVerificationExpires: '',
      },
    }
  )
  return { ok: true }
}
