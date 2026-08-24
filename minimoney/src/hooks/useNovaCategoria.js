import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";
import { useState } from "react";

export function useNovaCategoria() {
  const userId = useUserId();
  const [loading, setLoading] = useState(false);

  const salvar = async ({ ID, NOME, TIPO }) => {
    if (!userId) return;
    setLoading(true);
    try{
      if (ID) {
        await supabase
          .from("CATEGORIA")
          .update({ NOME, TIPO })
          .eq("ID", ID);
        return;
      }

      await supabase
        .from("CATEGORIA")
        .insert({
          NOME,
          TIPO,
          ID_USUARIO_FK: userId,
        });
    } finally {
      setLoading(false);
    }
  };

  const excluir = async (id) => {
    setLoading(true);
    try{
    await supabase
      .from("CATEGORIA")
      .delete()
      .eq("ID", id);
    } finally {
      setLoading(false);
    }
  };

  return { salvar, excluir, loading };
}
