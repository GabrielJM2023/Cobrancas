import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useCategoriaQuery() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const userId = useUserId();

  const carregar = useCallback(async () => {
    if (!userId) {
      setCategorias([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);

    try {
      const { data, error } = await supabase
        .from("CATEGORIA")
        .select("ID, NOME, TIPO")
        .eq("ID_USUARIO_FK", userId)
        .order("NOME", { ascending: true });

      if (error) {
        console.error("Erro ao carregar categorias:", error);
        setCategorias([]);
        return;
      }

      setCategorias(data ?? []);
    } finally {
      setCarregando(false);
    }
  }, [userId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { categorias, carregando, carregar };
}
