// src/api/auth.ts
import { API_BASE_URL } from './config';

export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/api/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login fallido");
  return res.json(); // { access, refresh }
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const res = await fetch(`${API_BASE_URL}/api/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Registro fallido");
  return res.json(); // { access, refresh }
};
