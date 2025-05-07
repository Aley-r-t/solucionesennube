
// src/components/ClientesList.tsx
import { useEffect, useState } from 'react';
import { fetchClientes } from '../api/clientes';

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export default function ClientesList({ token }: { token: string }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetchClientes(token).then(setClientes);
  }, [token]);

  return (
    <div className="contenedor">
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nombre} - {cliente.email} - {cliente.telefono}</li>
        ))}
      </ul>
    </div>
  );
}