import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseCliente";

export function useNovaSenha() {
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recuperacao, setRecuperacao] = useState(false);

  useEffect(() => {
    const detectarRecuperacao = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setRecuperacao(true);
      }
    };

    detectarRecuperacao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecuperacao(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

      navigate("/");
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
  };
}