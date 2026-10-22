import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';

export function usePatrimonioAnual(ano, { pUserId }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log("usePatrimonioAnual pUserId:", pUserId);
    setCarregando(true);
    if (!pUserId) {
      setDados([]);
      setCarregando(false);
      return;
    }

    async function carregar() {
      const { data, error } = await supabase.rpc(
        "GET_PATRIMONIO_ANUAL",
        {
          p_id_usuario: pUserId,
          p_ano: ano,
        }
      );

      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setCarregando(false);
    }

    carregar();
  }, [pUserId, ano]);

  return {
    dados,
    carregando,
  };
}
