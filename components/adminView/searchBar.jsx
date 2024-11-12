import { SearchIcon } from '@/public/icons/SearchIcon'

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6 relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar usuarios por nombre o email..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}