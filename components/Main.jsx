import { Chat } from "@/components/Chat";
import { signOut, useSession } from "next-auth/react";

const Main = ({ setShowAdmin }) => {
  const { data: session } = useSession();

  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 h-screen w-screen">
      {/* Navbar */}
      <div className="bg-gray-300 w-full flex gap-5 p-4 justify-between">
        <div className="flex items-center gap-3">
          <h1 className="source-code-pro font-semibold text-xl">
            Bienvenid@ a RAG JSON'S, {session?.user?.email}.
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={
              session?.user?.image ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className="h-[50px] w-[50px] rounded-full border mr-2 gap-2"
            alt="User Avatar"
          />
          {/* Mostrar botón solo si el usuario tiene rol de admin */}
          {session?.user?.role === "admin" && (
            <button
              onClick={() => setShowAdmin(true)}
              className="source-code-pro bg-gray-400 p-2 rounded-md text-black hover:underline hover:bg-gray-500 hover:text-white"
            >
              Panel de Administrador
            </button>
          )}
          <button
            onClick={() => signOut()}
            className="source-code-pro bg-gray-400 p-2 rounded-md text-black hover:underline hover:bg-gray-500 hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex justify-center mt-10 pt-4">
        <Chat />
      </div>
    </div>
  );
};

export default Main;
