import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-users/`)
    return response.data.users
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return []
  }
}

export const changeUserRole = async (email, newRole) => {
    try {
      const response = await axios.post(`${API_URL}/change-role?email=${email}&new_role=${newRole}`);

      return response.data; 
    } catch (error) {
      console.error('Error al cambiar el rol del usuario:', error.response ? error.response.data : error.message);
    }
};
