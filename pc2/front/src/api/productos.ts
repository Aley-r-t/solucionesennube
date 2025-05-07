export const fetchProductos = async (search?: string) => {
  const url = search
    ? `http://localhost:8000/api/productos/?search=${encodeURIComponent(search)}`
    : `http://localhost:8000/api/productos/`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};
