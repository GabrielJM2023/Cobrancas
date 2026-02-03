import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useResumoMensal(filtros) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase.rpc(
        'resumo_mensal',
        {
          p_usuario: user.id,
          p_data_inicio: filtros.dataInicio,
          p_data_fim: filtros.dataFim,
          p_tipo: filtros.tipo || null,
          p_categoria: filtros.categoria || null
        }
      );

      if (!error) setDados(data);
    };

    carregar();
  }, [filtros]);

  return dados;
}
