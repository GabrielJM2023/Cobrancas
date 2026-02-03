import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: usuario } = await supabase
            .from("USUARIO")
            .select("ID")
            .eq("USER_ID_FK", user.id)
            .single();
      console.log("Usuario ID (categorias):", usuario.ID);

      const { data } = await supabase
        .from("CATEGORIA")
        .select("ID, NOME, TIPO")
        .eq("ID_USUARIO_FK", usuario.ID);
      
      setCategorias(data || []);
    };

    carregar();
  }, []);

  return categorias;
}
