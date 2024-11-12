import axios from 'axios';


export async function registerUser(email, password) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    try {
      const response = await axios.post(`${apiUrl}/register/`, null, {
        params: { email, password },
      });
  
      return response.data; // Devuelve la respuesta
    } catch (error) {
      let errorMessage = 'Error desconocido';
  
      if (error.response) {
        // Si el servidor respondió, accedemos a los detalles del error
        if (error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ') || 'Error desconocido';
        } else {
          errorMessage = error.response.data.message || 'Error desconocido';
        }
      } else if (error.request) {
        errorMessage = 'No se recibió respuesta del servidor';
      } else {
        errorMessage = error.message;
      }
  
      console.error('Error:', errorMessage);
      throw new Error(errorMessage); // Lanza el mensaje de error adecuado
    }
  }