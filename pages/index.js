import { BurbleChat } from "@/components/BurbleChat";
import { Chat } from "@/components/Chat";
import Login from "@/pages/login";
import Google from "@/public/icons/Google";
import { useSession, signIn, signOut } from "next-auth/react"
import  Main  from "@/components/Main.jsx";
import AdminDashboard from "./adminView";



export default function Home() {
  const { data: session } = useSession()
  //si el usuario no ha iniciado session
  if (!session) {
    return (
      <Login />
    );
  }
  //si el usuario ya se registro
  return (
     <AdminDashboard /> //antes estaba Main
  );
}
