# Plaid Setup Guide

FinSight uses [Plaid](https://plaid.com) to connect users' bank accounts and fetch transaction data.

## 1. Create a Plaid Account

1. Go to [dashboard.plaid.com](https://dashboard.plaid.com) and sign up
2. You get free access to **Sandbox** for development (no real bank connections)

## 2. Get Your Credentials

1. In the Plaid Dashboard, go to **Team Settings** → **Keys**
2. Copy your **Client ID** and **Sandbox** secret

## 3. Add to Your `.env` or `.env.local`

```bash
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_sandbox_secret_here
```

For **production**, add:

```bash
PLAID_ENV=production
PLAID_SECRET=your_production_secret_here
```

(Use your Production secret from the Plaid Dashboard when going live.)

## 4. Sandbox Testing

In Sandbox mode, use these test credentials when Plaid Link asks you to log in:

- **Username:** `user_good`
- **Password:** `pass_good`

This will connect a test account with sample transactions.

## 5. Transaction Availability

After linking an account, Plaid may take a few minutes to fetch initial transactions. If you see empty or sparse data, wait a bit and try "Generate My Wrapped" again.

---

**Note:** Access tokens are stored in memory for now. For production, replace the in-memory store in `lib/plaid.ts` with a database (e.g. Vercel Postgres, Supabase).
