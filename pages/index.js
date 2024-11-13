import { useState } from 'react';
import Main from "@/components/Main";
import AdminDashboard from "./adminView";
import { useSession } from "next-auth/react";
import Login from "@/pages/login";

export default function Home() {
  const { data: session } = useSession();
  const [showAdmin, setShowAdmin] = useState(false);

  // Si el usuario no ha iniciado sesión
  if (!session) {
    return <Login />;
  }

  return (
    <div>
      {/* Mostrar Main cuando showAdmin sea false */}
      {!showAdmin ? (
        <Main setShowAdmin={setShowAdmin} />
      ) : (
        <AdminDashboard setShowAdmin={setShowAdmin} />
      )}
    </div>
  );
}
