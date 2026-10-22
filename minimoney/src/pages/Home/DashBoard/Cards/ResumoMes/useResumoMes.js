import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';

export function useResumoMes(ano, mes, { pUserId }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pUserId) return;

    async function carregar() {
      setLoading(true);
      const { data, error } = await supabase.rpc(
        "GET_RESUMO_MES",
        {
          p_id_usuario: pUserId,
          p_ano: ano,
          p_mes: mes,
        }
      );
      
      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setLoading(false);
    }

    carregar();
  }, [pUserId, ano, mes]);

  return {
    dados,
    loading,
  };
}
