import { useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useNavigate } from "react-router-dom";

export function useCadastro() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validaCampos = (nome, email, senha) => {
    if (!nome.trim() || !email.trim() || !senha) {
      if (!nome.trim()) return "Por favor, preencha o nome";
      if (!email.trim()) return "Por favor, preencha o email";
      if (!senha) return "Por favor, preencha a senha";
    }

    if (nome.trim().length < 3) return "O nome deve ter pelo menos 3 caracteres";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Digite um email válido";

    if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres";
    if (!/[0-9]/.test(senha) || !/[A-Za-z]/.test(senha))
      return "A senha deve conter letras e números";

    if (/\s/.test(senha)) return "A senha não pode conter espaços";

    return null;
  };

  const cadastroUsuario = async (nome, email, senha) => {
    const erroValidacao = validaCampos(nome, email, senha);
    if (erroValidacao) {
      setError(erroValidacao);
      return false;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: { data: { nome: nome.trim() } },
      });
      setLoading(false);

      if (error) {
        if (error.message.includes("already registered")) {
          setError("Este email já está cadastrado");
        } else if (error.message.includes("rate limit")) {
          setError("Muitas tentativas, aguarde um pouco");
        } else {
          setError("Erro ao cadastrar: " + error.message);
        }
        return false;
      }

      navigate("/home/dashboard");
      return true;
    } catch (e) {
      console.error("Erro inesperado", e.message);
      setError("Erro inesperado, tente novamente mais tarde");
      setLoading(false);
      return false;
    }
  };

  return { cadastroUsuario, loading, error, setError };
}
