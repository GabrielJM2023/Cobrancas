import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useEvolucaoFinanceira(filtros, userId) {
  const [resumo, setResumo] = useState([]);
  
  // Memoiza o objeto filtros para estabilizar a referência
  const filtrosMemo = useMemo(() => ({
    dataInicio: filtros.dataInicio,
    dataFim: filtros.dataFim,
    tipo: filtros.tipo,
    categoria: filtros.categoria
  }), [filtros.dataInicio, filtros.dataFim, filtros.tipo, filtros.categoria]);
  
  useEffect(() => {
    const carregar = async () => {
      //if (!userId) return;

      try {
        const { data, error } = await supabase.rpc('evolucao_financeira', {
          p_categoria: filtrosMemo.categoria || null,
          p_data_fim: filtrosMemo.dataFim,
          p_data_inicio: filtrosMemo.dataInicio,
          p_tipo: filtrosMemo.tipo || null,
          p_usuario: userId
        });

        if (error) {
          console.error("Erro ao carregar evolucao financeira:", error);
          setResumo(null);
        } else {
          setResumo(data || []);
          console.log("Evolucao financeira :", data);
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar evolucao financeira:", err);
      }
    };

    carregar();
  }, [filtrosMemo, userId]); // eslint agora não reclama

  return resumo;
}
