// src/components/LoginForm.tsx
import { useState } from 'react';
import { login } from '../api/auth';

interface Props {
  onLoginSuccess: (token: string) => void;
  onToggle: () => void;
}

export default function LoginForm({ onLoginSuccess, onToggle }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access } = await login(username, password);
      onLoginSuccess(access);
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="contenedor" style={{ maxWidth: '400px', margin: '50px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Usuario"
          required
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #aaa' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #aaa' }}
        />
        <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        ¿No tienes cuenta?{' '}
        <button onClick={onToggle} type="button" style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
          Registrarse
        </button>
      </p>
    </div>
  );
}