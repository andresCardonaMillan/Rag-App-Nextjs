import { UserPlusIcon } from '@/public/icons/UserPlusIcon'

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Panel de Control de Administrador</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
        <UserPlusIcon />
        Agregar Usuario
      </button>
    </header>
  )
}