import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useUserId() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          setUserId(null);
          return;
        }

        const { data: usuario, error: usuarioError } = await supabase
          .from("USUARIO")
          .select("ID")
          .eq("USER_ID_FK", user.id)
          .single();

        if (usuarioError || !usuario) {
          setUserId(null);
        } else {
          setUserId(usuario.ID);
        }
      } catch {
        setUserId(null);
      }
    };

    carregarUsuario();
  }, []);

  return userId;
}
