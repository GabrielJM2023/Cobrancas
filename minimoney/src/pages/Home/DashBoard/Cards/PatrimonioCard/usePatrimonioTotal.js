import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';
import { useUserId } from '../../../../../hooks/useUserID';

export function usePatrimonioTotal() {
  const [patrimonio, setPatrimonio] = useState(null);
  const userID = useUserId();

  useEffect(() => {
    if (!userID) return;
    
    const carregar = async () => {      
      const { data, error } = await supabase
        .from("vw_patrimonio")
        .select("*")
        .eq("ID_USUARIO_FK", userID)
        .single();

      if (!data) {
        setPatrimonio([]);
      } else {
        setPatrimonio(data);
      }
    };

    carregar();
  }, [userID]);

  return patrimonio;
}
