export const login = async (username: string, password: string) => {
  const res = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login fallido");
  return res.json(); // Devuelve { access, refresh }
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Registro fallido");
  return res.json(); // Devuelve { access, refresh }
};
