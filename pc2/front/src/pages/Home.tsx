// src/pages/Home.tsx
import { useState } from 'react';
import ClientesList from '../components/ClientesList';
import Productos from './Productos';

interface Props {
  token: string;
  onLogout: () => void;
}

export default function Home({ token, onLogout }: Props) {
  const [mostrarProductos, setMostrarProductos] = useState(false);

  return (
    <div
      className="contenedor-principal"
      style={{
        maxWidth: '800px',
        margin: '50px auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <ClientesList token={token} />

      <button
        onClick={() => setMostrarProductos(!mostrarProductos)}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {mostrarProductos ? 'Ocultar Productos' : 'Ver Productos'}
      </button>

      {mostrarProductos && <Productos />}
    </div>
  );
}
