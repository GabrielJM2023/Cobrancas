import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUsuario } from "./useUsuario";




export function useResumoFinanceiro(filtros) {
  const [resumo, setResumo] = useState(null);
  const { usuario } = useUsuario();

  useEffect(() => {
    if (!filtros || !filtros.dataInicio || !filtros.dataFim) return;
    if (!usuario) return; 

    const carregar = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Erro ao obter usuário:", userError);
          return;
        }

        const { data, error } = await supabase
          .rpc("resumo_financeiro", {
            p_usuario: usuario.id,
            p_data_inicio: filtros.dataInicio,
            p_data_fim: filtros.dataFim,
            p_tipo: filtros.tipo || null,
            p_categoria: filtros.categoria || null,
          })
          .single();

        if (error) {
          console.error("Erro ao carregar resumo financeiro:", error);
          setResumo(null);
        } else {
          setResumo(data);
          console.log("Resumo financeiro:", data);
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar resumo financeiro:", err);
      }
    };

    carregar();
  }, [filtros]);

  return resumo;
}
