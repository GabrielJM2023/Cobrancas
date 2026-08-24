import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";
import { useState } from "react";

const adicionarMeses = (data, meses) => {
  const d = new Date(data);
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().split("T")[0];
};

export function useNovaTransacao() {  
  const [loading, setLoading] = useState(false);

  const userID = useUserId();  
  
  const salvar = async (transacao) => {
    if (!userID) return;
    
    setLoading(true);
    const { ID, CATEGORIA, CONTA_ORIGEM, CONTA_DESTINO, ...dados } = transacao;
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
      if (dados.PARCELA > 1) {
        for (let i = 1; i < dados.PARCELA; i++) {
          const novaData = adicionarMeses(dados.DATA, i);
          await supabase
            .from("TRANSACAO")
            .insert({
              ...dados,
              DATA: novaData,
              PARCELA: 1,
              DESCRICAO: `${dados.DESCRICAO} (Parcela ${i + 1}/${dados.PARCELA})`,              
              ID_USUARIO_FK: userID,
          });
        }
      }
    };
    
    setLoading(false);
  }

  const excluir = async (id) => {    
    setLoading(true);
    await supabase
      .from("TRANSACAO")
      .delete()
      .eq("ID", id);
    setLoading(false);
  };

  return {
    salvar,
    excluir,
    loading,
  }; 
}