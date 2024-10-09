import Google from "@/public/icons/Google";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()
  //si el usuario no ha iniciado session
  if(!session){
    return(
      <div className="bg-blue-400 h-screen w-screen flex items-center">
        <div className="flex justify-center w-full">
            <div className="bg-white rounded-xl w-[400px] h-[450px] flex justify-center items-center">
              <div className="flex-row text-center">
              <h1 className="text-3xl font-bold mb-64">RAG - JSON's</h1>
              <button onClick={()=> signIn('google')} className="bg-black text-white p-2 rounded-md flex font-semibold gap-2 hover:bg-black/80"><Google className="size-6"/>Login with google</button>
              </div>
            </div>
        </div>
      </div>
    );
  }
  //si el usuario ya se registro
  return (
    <div className="bg-blue-400 h-screen w-screen">
      <div className="bg-white w-full flex gap-5 p-4 justify-end">
      <img src={session.user.image} className="h-[50px] w-[50px] rounded-full" alt=""/>
      <button onClick={()=> signOut()} className="bg-gray-400 p-2 rounded-md text-white hover:bg-gray-500">Cerrar session</button>
      </div>
      <div className="flex justify-center pt-4">
      <h1 className="font-bold text-xl">
      Bienvenido {session.user.name},
      ¿que desea averiguar hoy? 
      </h1>
      </div>
    </div>
  );
}
