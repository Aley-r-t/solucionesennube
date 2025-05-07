export const fetchClientes = async (token: string) => {
    const res = await fetch("http://localhost:8000/api/clientes/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("No se pudo cargar clientes");
    return res.json();
};

  