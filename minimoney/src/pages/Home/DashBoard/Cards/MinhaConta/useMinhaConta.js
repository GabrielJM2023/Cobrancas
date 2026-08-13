import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';
import { useUserId } from '../../../../../hooks/useUserID';

export function useMinhaConta() {
  const userID = useUserId();

  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userID) return;

    async function carregar() {
      setLoading(true);
      const { data, error } = await supabase
        .from("VW_PATRIMONIO_CONTA")
        .select("*")
        .eq("ID_USUARIO_FK", userID)
      
      if (error) {
        console.error(error);
        setDados([]);
      } else {
        setDados(data ?? []);
      }

      setLoading(false);
    }

    carregar();
  }, [userID]);

  return {
    dados,
    loading,
  };
}
