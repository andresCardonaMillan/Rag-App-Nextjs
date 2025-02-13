import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Google from "@/public/icons/Google";
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      alert('Error en el inicio de sesión: ' + result.error);
    } else {
      console.log('Inicio de sesión exitoso');
      router.push('/');  // Redirige a la página de inicio después de un inicio de sesión exitoso
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Bienvenido a JSON'S - RAG</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Ingresa tu correo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">¿No tienes una cuenta?</span>
          <button
            onClick={handleRegister}
            className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
          >
            Regístrate
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button onClick={() => signIn('google')}
            className="flex items-center justify-center w-full p-2 space-x-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <Google />
            <span>Iniciar sesión con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
