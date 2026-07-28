import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useContaQuery() {
  const [Conta, setConta] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const userId = useUserId();

  const carregar = useCallback(async () => {
    if (!userId) {
      setConta([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);

    try {
      const { data, error } = await supabase
        .from("CONTA")
        .select("ID, NOME, ATIVO")
        .eq("ID_USUARIO_FK", userId)
        .order("NOME", { ascending: true });

      if (error) {
        console.error("Erro ao carregar Conta:", error);
        setConta([]);
        return;
      }

      setConta(data ?? []);
    } finally {
      setCarregando(false);
    }
  }, [userId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { Conta, carregando, carregar };
}
