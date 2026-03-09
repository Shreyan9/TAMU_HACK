# Email verification

After signup, users must verify their email before they can sign in.

## Flow

1. User signs up → account is created with `emailVerified: false`, a verification token is generated and stored.
2. A verification email is sent (or the link is logged if no email API key is set).
3. User clicks the link → `GET /api/auth/verify-email?token=...` → marks email as verified and redirects to login.
4. User can then sign in.

## Sending verification emails (optional)

- **Without an API key:** In development, the verification link is printed in the terminal (server console). Use that link to verify. Sign-in is still blocked until the email is verified.
- **With Resend:** To send real emails, use [Resend](https://resend.com) (free tier available).

### Resend setup

1. Sign up at [resend.com](https://resend.com) and create an API key.
2. Add to `.env`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
3. **From address:** Resend requires a verified domain. For testing you can use their default:
   ```env
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```
   For production, verify your domain in the Resend dashboard and set `RESEND_FROM_EMAIL` to e.g. `noreply@yourdomain.com`.

## Existing users

Accounts created before email verification was added have no `emailVerified` field, so they can still sign in. New signups require verification.
