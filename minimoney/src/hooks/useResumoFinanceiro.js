import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useResumoFinanceiro(filtros, userID) {
  const [resumo, setResumo] = useState(null);
  const filtrosMemo = useMemo(() => ({
      dataInicio: filtros.dataInicio,
      dataFim: filtros.dataFim,
      tipo: filtros.tipo,
      categoria: filtros.categoria
   }), [filtros.dataInicio, filtros.dataFim, filtros.tipo, filtros.categoria]);
    
  useEffect(() => {    
    const carregar = async () => {
      try {        
        const { data, error } = await supabase
          .rpc("resumo_financeiro", {
            p_categoria: filtrosMemo.categoria || null,
            p_data_fim: filtrosMemo.dataFim,
            p_data_inicio: filtrosMemo.dataInicio,
            p_tipo: filtrosMemo.tipo || null,
            p_usuario: userID           
          });

        if (error) {
          console.error("Erro ao carregar resumo financeiro:", error);
          setResumo(null);
        } else {
          setResumo(data?.[0] || null);
          console.log("Resumo financeiro:", data);
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar resumo financeiro:", err);
      }
    };

    carregar();
  }, [filtrosMemo, userID]);

  return resumo;
}
