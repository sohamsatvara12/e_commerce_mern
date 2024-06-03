import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Google({
      clientId:NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers as needed
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Custom logic to handle sign-in
      return true; 
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  debug: process.env.NODE_ENV === 'development', // Enable debugging in development
  onError(error, req, res) {
    // Handle errors during sign-in process
    console.error('NextAuth Error:', error.message);
    res.status(500).end(error.message);
  },
};

export default (req, res) => NextAuth(req, res, options);
