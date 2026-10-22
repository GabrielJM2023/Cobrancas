import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';

export function useGastoCategoria(ano, mes, { pUserId }) {
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
        "GET_GASTOS_CATEGORIAS_MES",
        {
          p_id_usuario: pUserId,
          p_ano: ano,
          p_mes: mes
        });
      
      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setCarregando(false);
    }

    carregar();
  }, [pUserId, ano, mes]);

  return {
    dados,
    carregando,
  };
}
