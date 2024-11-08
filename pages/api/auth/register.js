import axios from 'axios';

// export async function registerUser(email, password) {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     console.log('Llamando a la API:', `${apiUrl}/register/`); // Verificar URL
  
//     try {
//       const response = await axios.post(`${apiUrl}/register/`, null, {
//         params: {
//           email: email,
//           password: password,
//         },
//       });
  
//       return response.data; // Axios ya convierte la respuesta a JSON automáticamente
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response:', error.response.data); // Imprimir la respuesta de error en la consola
//         throw new Error(JSON.stringify(error.response.data)); // Lanzar el detalle como error
//       } else if (error.request) {
//         console.error('Error request:', error.request);
//         throw new Error('No se recibió respuesta del servidor');
//       } else {
//         console.error('Error:', error.message);
//         throw new Error(error.message);
//       }
//     }
//   }

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