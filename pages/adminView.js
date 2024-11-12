// 'use client'

// import { useState } from 'react'
// import {Header} from '../components/adminView/header'
// import {SearchBar} from '../components/adminView/searchBar'
// import {UserTable} from '../components/adminView/userTable'

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([
//     { id: '1', name: 'Juan Pérez', email: 'juan@example.com', isAdmin: false },
//     { id: '2', name: 'María García', email: 'maria@example.com', isAdmin: true },
//     { id: '3', name: 'Carlos López', email: 'carlos@example.com', isAdmin: false },
//     { id: '4', name: 'Ana Martínez', email: 'ana@example.com', isAdmin: false },
//     { id: '5', name: 'Luis Rodríguez', email: 'luis@example.com', isAdmin: true },
//   ])

//   const [searchTerm, setSearchTerm] = useState('')

//   const toggleAdminRole = (userId) => {
//     setUsers(users.map(user => 
//       user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
//     ))
//   }

//   const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="container mx-auto p-6">
//       <Header />
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <UserTable users={filteredUsers} toggleAdminRole={toggleAdminRole} />
//       {filteredUsers.length === 0 && (
//         <p className="text-center mt-4 text-gray-500">No se encontraron usuarios.</p>
//       )}
//     </div>
//   )
// }

'use client'

import { useState } from 'react'

const users = [
  { id: '1', name: 'Juan Pérez', email: 'juan@example.com', isAdmin: false },
  { id: '2', name: 'María García', email: 'maria@example.com', isAdmin: true },
  { id: '3', name: 'Carlos López', email: 'carlos@example.com', isAdmin: false },
  { id: '4', name: 'Ana Martínez', email: 'ana@example.com', isAdmin: false },
  { id: '5', name: 'Luis Rodríguez', email: 'luis@example.com', isAdmin: true },
]

export default function AdminDashboard() {
  const [userList, setUserList] = useState(users)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleAdminRole = (userId) => {
    setUserList(userList.map(user => 
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    ))
  }

  const filteredUsers = userList.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Control de Administrador</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 8a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V8z" />
          </svg>
          Agregar Usuario
        </button>
      </header>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Buscar usuarios por nombre o email..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className="sr-only">Toggle admin role for {user.name}</span>
                    <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${user.isAdmin ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <div
                        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                          user.isAdmin ? 'transform translate-x-5' : ''
                        }`}
                      ></div>
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={user.isAdmin}
                      onChange={() => toggleAdminRole(user.id)}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No se encontraron usuarios.</p>
      )}
    </div>
  )
}