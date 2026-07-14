import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useNovaCategoria() {
  const userId = useUserId();

  const salvar = async ({ ID, NOME, TIPO }) => {
    if (!userId) return;

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
  };

  const excluir = async (id) => {
    await supabase
      .from("CATEGORIA")
      .delete()
      .eq("ID", id);
  };

  return { salvar, excluir };
}
