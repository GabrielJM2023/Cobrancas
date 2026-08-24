import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";
import { useState } from "react";

export function useNovaConta() {
  const [loading, setLoading] = useState(false);
  const userId = useUserId();

  const salvar = async ({ ID, NOME, ATIVO }) => {
    if (!userId) return;

    setLoading(true);

    try {
      if (ID) {
        await supabase
          .from("CONTA")
          .update({ NOME, ATIVO })
          .eq("ID", ID);

        return;
      }

      await supabase
        .from("CONTA")
        .insert({
          NOME,
          ATIVO,
          ID_USUARIO_FK: userId,
        });

    } finally {
      setLoading(false);
    }
  };

  const excluir = async (id) => {
    setLoading(true);

    try {
      await supabase
        .from("CONTA")
        .delete()
        .eq("ID", id);

    } finally {
      setLoading(false);
    }
  };

  return {
    salvar,
    excluir,
    loading,
  };
}