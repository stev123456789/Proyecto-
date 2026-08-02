import axios from 'axios';

// Detecta automáticamente la IP del servidor
// Por defecto usa localhost, pero puedes cambiarla manualmente si es necesario
const getBaseURL = () => {
  // Cambiar 'localhost' por la IP de tu laptop si accedes desde otra máquina
  // Ejemplo: 'http://192.168.1.100:8000/api/'
  const backendIP = localStorage.getItem('backendIP') || 'localhost';
  return `http://${backendIP}:8000/api/`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Función para cambiar el servidor de forma dinámica (útil para testing)
export const setBackendIP = (ip) => {
  localStorage.setItem('backendIP', ip);
  api.defaults.baseURL = `http://${ip}:8000/api/`;
};