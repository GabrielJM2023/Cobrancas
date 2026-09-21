import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseCliente";
import { useAuth } from "../context/AuthContext";

export function useNovaSenha() {
  const navigate = useNavigate();
  const {
    user,
    loading: carregandoAutenticacao,
    isPasswordRecovery,
    clearPasswordRecovery,
  } = useAuth();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const recuperacao = Boolean(user && isPasswordRecovery);

  const alterarSenha = async () => {
    setError(null);

    if (!novaSenha) {
      setError("Informe uma nova senha.");
      return;
    }

    if (novaSenha.length < 6) {
      setError("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não são iguais.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) {
        setError(error.message);
        return;
      }

      clearPasswordRecovery();
      await supabase.auth.signOut();
      navigate("/Login", { replace: true });
    } catch (erro) {
      setError("N\u00e3o foi poss\u00edvel alterar a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    novaSenha,
    setNovaSenha,
    confirmarSenha,
    setConfirmarSenha,
    alterarSenha,
    loading,
    error,
    recuperacao,
    carregandoAutenticacao,
  };
}
