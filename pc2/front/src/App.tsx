import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './pages/Home';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  if (!token) {
    return mostrarRegistro ? (
      <RegisterForm onRegisterSuccess={setToken} onToggle={() => setMostrarRegistro(false)} />
    ) : (
      <LoginForm onLoginSuccess={setToken} onToggle={() => setMostrarRegistro(true)} />
    );
  }

  return <Home token={token} onLogout={() => setToken(null)} />;
}
