
import { API_BASE_URL } from './config';

export const fetchProductos = async (search?: string) => {
  const url = search
    ? `${API_BASE_URL}/api/productos/?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/api/productos/`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};
