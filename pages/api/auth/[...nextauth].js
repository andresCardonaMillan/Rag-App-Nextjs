import client from '@/lib/db';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
          const res = await fetch(
            `http://127.0.0.1:8001/login/?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`,
            { method: 'GET' }
          );

          if (!res.ok) throw new Error('Credenciales inválidas');

          const loginResponse = await res.json();
          if (loginResponse.status !== 'User logged in successfully') return null;

          return {
            id: credentials.email,
            name: credentials.email.split('@')[0],
            email: credentials.email,
          };
        } catch (error) {
          console.error('Error en la autenticación:', error);
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      // Obtener el rol del usuario si aún no está en el token
      if (!token.role && token.email) {
        try {
          const res = await fetch('http://127.0.0.1:8001/get-all-users/');
          const data = await res.json();
          const userFromDb = data.users.find((u) => u.email === token.email);

          if (userFromDb) {
            token.role = userFromDb.rol;
          } else {
            token.role = 'user';
          }
        } catch (error) {
          console.error('Error obteniendo el rol del usuario:', error);
          token.role = 'user';
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      return session;
    },
  },
});
