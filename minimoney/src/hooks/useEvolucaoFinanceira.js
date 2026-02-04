import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useEvolucaoFinanceira(filtros) {
  const [resumo, setResumo] = useState([]);

  useEffect(() => {
    const carregar = async () => {
    try{
      const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Erro ao obter usuário:", userError);
          return;
        }
        const { data: usuario } = await supabase
          .from("USUARIO")
          .select("ID")
          .eq("USER_ID_FK", user.id)
          .single();

        const { data, error } = await supabase
          .rpc('evolucao_financeira', {
            p_categoria: filtros.categoria || null,
            p_data_fim: filtros.dataFim,
            p_data_inicio: filtros.dataInicio,
            p_tipo: filtros.tipo || null,
            p_usuario: usuario.ID           
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
  }, [filtros.dataInicio, filtros.dataFim, filtros.tipo, filtros.categoria, filtros.periodo]);

  return resumo;
}
