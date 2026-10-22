import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';

export function useMinhaConta({ pUserId }) {
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
      setCarregando(true);
      const { data, error } = await supabase
        .from("VW_PATRIMONIO_CONTA")
        .select("*")
        .eq("ID_USUARIO_FK", pUserId)
      
      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setCarregando(false);
    }

    carregar();
  }, [pUserId]);

  return {
    dados,
    carregando,
  };
}
