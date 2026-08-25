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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nova-senha`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSucesso(true);
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