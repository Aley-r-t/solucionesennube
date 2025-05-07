
// src/components/ProductosList.tsx
import { useEffect, useState } from 'react';
import { fetchProductos } from '../api/productos';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
}

export default function ProductosList() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProductos(search).then(setProductos);
  }, [search]);
  
  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto..." />
  

  return (
    <div className="contenedor">
      <h2>Productos</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto..." />
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong>: {producto.descripcion} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
