import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';
import { useUserId } from '../../../../../hooks/useUserID';

export function useFluxoCaixa(ano) {
  const userID = useUserId();

  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userID) return;

    async function carregar() {
      setLoading(true);
      const { data, error } = await supabase.rpc(
        "GET_FLUXO_CAIXA_ANUAL",
        {
          p_id_usuario: userID,
          p_ano: ano,
        }
      );
      console.log("Dados do fluxo de caixa:", data);
      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setLoading(false);
    }

    carregar();
  }, [userID, ano]);

  return {
    dados,
    loading,
  };
}
