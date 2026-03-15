# MongoDB + NextAuth Setup

Auth is now handled by **NextAuth.js** with **MongoDB** for users and Plaid links.

## Env vars (already in `.env`)

- **MONGODB_URI** – Your Atlas connection string (database name `finsight` is used).
- **NEXTAUTH_SECRET** – Used to sign JWTs (keep secret, use a long random string in production).
- **NEXTAUTH_URL** – App URL, e.g. `http://localhost:3000` (use your real URL in production).

You can remove the old Auth0 vars: `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET`.

## Collections in MongoDB

- **users** – Email, hashed password, name (created on sign up).
- **plaid_links** – Per-user Plaid `accessToken`, `accountId`, `itemId` (created when user connects bank).

## Flow

1. **Sign up** – `/auth/signup` → POST `/api/auth/signup` → user stored in `users`.
2. **Sign in** – `/auth/login` → NextAuth Credentials → JWT session.
3. **Connect bank** – Plaid Link → exchange token → stored in `plaid_links` by `userId` (from JWT).
4. **Generate Wrapped** – Reads from `plaid_links` for the current user, then calls Plaid.

## Run the app

```bash
npm run dev
```

Then open http://localhost:3000, sign up, sign in, and connect a bank via Plaid.
