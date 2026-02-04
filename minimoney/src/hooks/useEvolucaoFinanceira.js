import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useEvolucaoFinanceira(filtros) {
  const [resumo, setResumo] = useState([]);
  const userId = useUserId();
  const { dataInicio, dataFim, tipo, categoria, periodo } = filtros;

  useEffect(() => {
    const carregar = async () => {
    try{
        if (!userId) {
          console.error("Usuário não autenticado.");
          return;
        }
        
        const { data, error } = await supabase
          .rpc('evolucao_financeira', {
            p_categoria: categoria || null,
            p_data_fim: dataFim,
            p_data_inicio: dataInicio,
            p_tipo: tipo || null,
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
  }, [dataInicio, dataFim, tipo, categoria, periodo, userId]);

  return resumo;
}
