import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useNovaConta() {
  const userId = useUserId();

  const salvar = async ({ ID, NOME, ATIVO }) => {
    if (!userId) return;

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
  };

  const excluir = async (id) => {
    await supabase
      .from("CONTA")
      .delete()
      .eq("ID", id);
  };

  return { salvar, excluir };
}
