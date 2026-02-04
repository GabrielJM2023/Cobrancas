import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useCategorias(tipo) {
  const [categorias, setCategorias] = useState([]);
  const userID = useUserId();

  useEffect(() => {
    if (!userID) return;
    
    const carregar = async () => {      
      let query = supabase
        .from("CATEGORIA")
        .select("ID, NOME, TIPO")
        .eq("ID_USUARIO_FK", userID); 
      
      if (tipo) {
        query = query.eq("TIPO", tipo);
      }
      const { data, error } = await query;

      if (error) throw error;

      setCategorias(data || []);
    };

    carregar();
  }, [userID, tipo]);

  return categorias;
}
