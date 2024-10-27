import { BurbleChat } from "@/components/BurbleChat";
import { Chat } from "@/components/Chat";
import Google from "@/public/icons/Google";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()
  //si el usuario no ha iniciado session
  if (!session) {
    return (
      <div className="bg-blue-400 h-screen w-screen flex items-center">
        <div className="flex justify-center w-full">
          <div className="bg-white rounded-xl w-[400px] h-[450px] flex justify-center items-center">
            <div className="flex-row text-center">
              <h1 className="text-3xl font-bold mb-64">RAG - JSON's</h1>
              <button onClick={() => signIn('google')} className="bg-black text-white p-2 rounded-md flex font-semibold gap-2 hover:bg-black/80"><Google className="size-6" />Login with google</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //si el usuario ya se registro
  return (
    <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200  h-screen w-screen">

      <div className="bg-gray-300 w-full flex gap-5 p-4 justify-between">
        <div className="flex items-center gap-3">
          <h1 className="source-code-pro font-semibold text-xl">
            Bienvenid@ a RAG JSON´S {session.user.name}.
          </h1>
        </div>
        <div className="flex items-center gap-3">
        <img src={session.user.image} className="h-[50px] w-[50px] rounded-full mr-2 gap-2" alt="" />
        <button onClick={() => signOut()} className="source-code-pro bg-gray-400 p-2 rounded-md text-black hover:underline hover:bg-gray-500 hover:text-white">
          Cerrar sesión
        </button>
        </div>
      </div>

      <div className="flex justify-center pt-4">

      <Chat/>
      </div>
    </div>
  );
}
