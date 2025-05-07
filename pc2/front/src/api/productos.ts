export const fetchProductos = async (search?: string) => {
  const url = search
    ? `/api/productos/?search=${encodeURIComponent(search)}`
    : `/api/productos/`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};
