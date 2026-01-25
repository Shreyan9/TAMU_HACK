import { Auth0Client } from '@auth0/nextjs-auth0/server';

// Validate required environment variables
const requiredEnvVars = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_SECRET: process.env.AUTH0_SECRET,
  APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000',
};

// Validate APP_BASE_URL is a valid URL
if (requiredEnvVars.APP_BASE_URL && !requiredEnvVars.APP_BASE_URL.startsWith('http')) {
  throw new Error('APP_BASE_URL must be a valid absolute URL (e.g., http://localhost:3000)');
}

export const auth0 = new Auth0Client();
