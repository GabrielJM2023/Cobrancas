import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useNovaTransacao() {
  const userID = useUserId();  
  
  const salvar = async (transacao) => {
    if (!userID) return;

    const { ID, CATEGORIA, ...dados } = transacao;
    console.log (ID);
    if (ID) {
      await supabase
        .from("TRANSACAO")
        .update(dados)
        .eq("ID", ID);
    } else {
      await supabase
        .from("TRANSACAO")
        .insert({
          ...dados,
          ID_USUARIO_FK: userID,
        });
    }
  };

  const excluir = async (id) => {
    await supabase
      .from("TRANSACAO")
      .delete()
      .eq("ID", id);
  };

  return {
    salvar,
    excluir,
  };
}
