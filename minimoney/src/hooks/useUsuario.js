import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw authError || new Error("Usuário não autenticado");

        const { data, error: usuarioError } = await supabase
          .from("USUARIO")
          .select("ID, NOME")
          .eq("USER_ID_FK", user.id)
          .single();

        if (usuarioError || !data) throw usuarioError || new Error("Usuário não encontrado");

        setUsuario(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();
  }, []);

  return { usuario, loading, error };
}
