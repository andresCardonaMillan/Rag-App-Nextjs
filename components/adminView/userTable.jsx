import { Switch } from './switch.jsx'

export default function UserTable({ users, toggleAdminRole }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-right">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 text-right">
                <Switch
                  checked={user.isAdmin}
                  onChange={() => toggleAdminRole(user.id)}
                  label={`Toggle admin role for ${user.name}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}