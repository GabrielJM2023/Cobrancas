import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('CATEGORIA')
        .select('ID, DESCRICAO')
        .eq('USER_ID_FK', user.id)
        .order('DESCRICAO');

      if (!error) setCategorias(data);
    };

    carregar();
  }, []);

  return categorias;
}
