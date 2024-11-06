import client from '@/lib/db'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`http://127.0.0.1:8001/login/?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`, {
            method: 'GET',
          });

          if (!res.ok) {
            throw new Error('Invalid credentials');
          }

          const user = await res.json();
          if (user.status === 'User logged in successfully') {
            // Return user object that NextAuth will store in the session
            return { id: user.id, name: user.name, email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  pages: {
    signIn: '/login',  // Personaliza la página de inicio de sesión
  },
  session: {
    strategy: 'jwt',  // Utiliza JWT para almacenar la sesión
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
