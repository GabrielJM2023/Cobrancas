import { useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const enviarEmail = async (email) => {
    setLoading(true);
    setError(null);
    setSucesso(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/nova-senha`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSucesso(true);
    } catch (erro) {
      setError("N\u00e3o foi poss\u00edvel enviar o link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    enviarEmail,
    loading,
    error,
    sucesso,
    setError,
  };
}
