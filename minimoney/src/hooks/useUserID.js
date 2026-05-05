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
          .select("ID_AUTH_FK")
          .eq("ID_AUTH_FK", user.id)
          .single();

        if (usuarioError || !usuario) {
          setUserId(null);
        } else {
          setUserId(usuario.ID_AUTH_FK);
        }
      } catch {
        setUserId(null);
      }
    };

    carregarUsuario();
  }, []);

  return userId;
}
