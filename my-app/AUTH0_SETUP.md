# Auth0 Email Sign-In Setup Guide

This guide will help you set up Auth0 email sign-in for your FinSight application.

## Step 1: Create an Auth0 Account

1. Go to [Auth0](https://auth0.com) and sign up for a free account
2. No credit card required - you get 7,000 free active users!

## Step 2: Create an Application in Auth0 Dashboard

1. Log in to your [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** → **Applications** in the sidebar
3. Click **Create Application**
4. Choose **Regular Web Applications** as the application type
5. Click **Create**

## Step 3: Configure Your Application

1. In your application settings, go to the **Settings** tab
2. Find the following values and copy them:
   - **Domain** (e.g., `your-tenant.us.auth0.com`)
   - **Client ID**
   - **Client Secret** (click "Show" to reveal it)

## Step 4: Enable Email/Password Connection

1. In the Auth0 Dashboard, go to **Authentication** → **Database** → **Username-Password-Authentication**
2. Make sure it's enabled (it should be by default)
3. You can customize the login experience in the **Universal Login** section if desired

## Step 5: Configure Application URLs

1. In your application settings, scroll down to **Application URIs**
2. Set the following:
   - **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

   For production, add your production URLs as well:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.com`

   **IMPORTANT**: In Auth0 SDK v4.14, the callback URL is `/auth/callback` (NOT `/api/auth/callback` like in v3)

## Step 6: Set Up Environment Variables

1. Create a `.env.local` file in the root of your project (same directory as `package.json`)
2. Copy the contents from `.env.example` and fill in your Auth0 values:

```env
AUTH0_DOMAIN='YOUR_AUTH0_DOMAIN'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
AUTH0_SECRET='your-secret-here'
APP_BASE_URL='http://localhost:3000'
```

### Generate AUTH0_SECRET

Run this command in your terminal to generate a secure secret:

```bash
openssl rand -hex 32
```

Copy the output and use it as your `AUTH0_SECRET` value.

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click "Get Started" or "Sign In" in the navbar
4. You should be redirected to Auth0's login page
5. Click "Sign Up" to create a new account with email/password
6. After signing up, you'll be redirected back to your app

## Features Included

✅ Email/password authentication  
✅ User session management  
✅ Protected routes (dashboard)  
✅ Login/logout functionality  
✅ User profile display in navbar  

## Troubleshooting

### "Invalid state" error
- Make sure your callback URL matches exactly what's configured in Auth0
- Clear your browser cookies and try again

### "Configuration error"
- Verify all environment variables are set correctly
- Make sure there are no extra spaces or quotes in your `.env.local` file

### Can't see the login page
- Check that your Auth0 application is set to "Regular Web Applications"
- Verify the AUTH0_DOMAIN is set correctly (without `https://` prefix)

### "Callback URL mismatch" error
- **This is the most common error!** Make sure your **Allowed Callback URLs** in Auth0 Dashboard includes:
  - `http://localhost:3000/auth/callback` (for development)
  - The URL must be `/auth/callback` NOT `/api/auth/callback` (v4.14 uses different routes)
- After updating, wait a few seconds for changes to propagate, then try again

## Next Steps

- Customize the login experience in Auth0 Dashboard → Branding
- Add social logins (Google, GitHub, etc.) in Auth0 Dashboard → Authentication → Social
- Configure password policies in Auth0 Dashboard → Authentication → Database

For more information, visit the [Auth0 Next.js SDK Documentation](https://auth0.com/docs/quickstart/webapp/nextjs).
