import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useConta() {
  const [categorias, setConta] = useState([]);
  const userID = useUserId();

  useEffect(() => {
    if (!userID) return;
    
    const carregar = async () => {      
      let query = supabase
        .from("CONTA")
        .select("ID, NOME, ATIVO")
        .eq("ID_USUARIO_FK", userID); 
      
      const { data, error } = await query;

      if (error) throw error;

      setConta(data || []);
    };

    carregar();
  }, [userID]);

  return categorias;
}
