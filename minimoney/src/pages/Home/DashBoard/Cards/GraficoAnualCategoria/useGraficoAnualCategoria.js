import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';

export function useCategoriaAnual(ano, { pUserId }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    if (!pUserId) {
      setDados([]);
      setCarregando(false);
      return;
    }

    async function carregar() {
      const { data, error } = await supabase.rpc(
        "GET_CATEGORIA_ANUAL",
        {
          p_id_usuario: pUserId,
          p_ano: ano,
        }
      );

      if (error) {
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
