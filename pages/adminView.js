'use client'

import { useState, useEffect } from 'react';
import { getAllUsers, changeUserRole } from './api/change-rol';

export default function AdminDashboard() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar usuarios al montar el componente, excluyendo administradores
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      const nonAdminUsers = users.filter(user => user.role !== 'admin');
      setUserList(nonAdminUsers); 
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (email, newRole) => {
    try {
      // Enviar el nuevo rol al backend
      const response = await changeUserRole(email, newRole);

      if (response) {
        // Actualizar el estado después de cambiar el rol
        setUserList(
          userList.map((u) =>
            u.email === email ? { ...u, role: newRole } : u // Actualizamos el rol en el estado
          )
        );
      } else {
        console.error(`No se pudo cambiar el rol del usuario con email: ${email}`);
      }
    } catch (error) {
      console.error('Error al cambiar el rol:', error.response ? error.response.data : error.message);
    }
  };

  const filteredUsers = userList.filter(
    (user) =>
      (user?.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user?.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Control de Administrador</h1>
      </header>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o email..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rol</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.email, e.target.value)}
                      className="py-2 px-4 border border-gray-300 rounded-md"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center px-6 py-4 text-gray-500">
                  No hay usuarios disponibles para cambiar el rol.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No se encontraron usuarios.</p>
      )}
    </div>
  );
}

