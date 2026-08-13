import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';
import { useUserId } from '../../../../../hooks/useUserID';

export function useResumoMes(ano, mes) {
  const userID = useUserId();

  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userID) return;

    async function carregar() {
      setLoading(true);
      const { data, error } = await supabase.rpc(
        "GET_RESUMO_MES",
        {
          p_id_usuario: userID,
          p_ano: ano,
          p_mes: mes,
        }
      );
      console.log("Dados do resumo do mês:", data);
      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setLoading(false);
    }

    carregar();
  }, [userID, ano, mes]);

  return {
    dados,
    loading,
  };
}
