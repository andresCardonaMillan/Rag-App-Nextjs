// api/auth/register.js
import axios from 'axios';


export async function registerUser(email, password) {
  try {
    const response = await axios.post(`http://127.0.0.1:8001/register/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    
    // Verifica si la respuesta tiene el formato correcto
    if (response.data.status === 'User created successfully') {
      return { success: true, message: response.data.status };
    } else {
      return { success: false, message: 'Error en el registro' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Error en la solicitud de registro' };
  }
}
