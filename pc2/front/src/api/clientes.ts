import { API_BASE_URL } from './config';

export const fetchClientes = async (token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/clientes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("No se pudo cargar clientes");
  return res.json();
};
