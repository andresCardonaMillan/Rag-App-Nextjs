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
          // Hacer la solicitud de autenticación al backend
          const res = await fetch(
            `http://127.0.0.1:8001/login/?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`,
            {
              method: 'GET',
            }
          );
      
          if (!res.ok) {
            throw new Error('Credenciales inválidas');
          }
      
          const response = await res.json();
          if (response.status === 'User logged in successfully') {
            console.log('Usuario autenticado exitosamente');
      
            // Crear un objeto de usuario "mock"
            const mockUser = {
              id: credentials.email, // Usar el correo como identificador único si no tienes un ID real
              name: credentials.email.split('@')[0], // Derivar el nombre del correo electrónico
              email: credentials.email,
              image: credentials.image
            };
      
            return mockUser; // Retorna el usuario con los datos que puedas proporcionar
          } else {
            return null; // En caso de que la autenticación falle
          }
        } catch (error) {
          console.error('Error de inicio de sesión:', error);
          return null;
        }
      }
      
    }),
  ],
  adapter: MongoDBAdapter(client),
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', // Usamos JWT como estrategia de sesión
  },
  callbacks: {
    async session({ session, token }) {

      // Almacenamos el email y otros datos del token en la sesión
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,  // Puedes agregar más datos según sea necesario
      };
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;  // Almacenamos el correo en el token
        token.name = user.name;    // Almacenamos el nombre si es necesario
      }


      return token;
    },
  },
});
