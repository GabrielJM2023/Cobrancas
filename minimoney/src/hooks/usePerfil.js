import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useAuth } from "../context/AuthContext";

export function usePerfil() {
  const { user, loading: carregandoAutenticacao } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvandoNome, setSalvandoNome] = useState(false);
  const [salvandoSenha, setSalvandoSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    const carregarPerfil = async () => {
      if (carregandoAutenticacao) return;

      if (!user) {
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setEmail(user.email || "");

      try {
        const { data, error } = await supabase
          .from("USUARIO")
          .select("NOME")
          .eq("ID_AUTH_FK", user.id)
          .single();

        if (error || !data) {
          setNome(user.user_metadata?.nome || "");
          return;
        }

        setNome(data.NOME || "");
      } catch {
        setNome(user.user_metadata?.nome || "");
      } finally {
        setCarregando(false);
      }
    };

    carregarPerfil();
  }, [user, carregandoAutenticacao]);

  const salvarNome = async () => {
    const nomeAtualizado = nome.trim();
    setErro("");
    setSucesso("");

    if (nomeAtualizado.length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.");
      return false;
    }

    if (!user) {
      setErro("Não foi possível identificar o usuário.");
      return false;
    }

    setSalvandoNome(true);

    try {
      const { error: usuarioError } = await supabase
        .from("USUARIO")
        .update({ NOME: nomeAtualizado })
        .eq("ID_AUTH_FK", user.id);

      if (usuarioError) {
        setErro("Não foi possível atualizar o nome. Tente novamente.");
        return false;
      }

      const { error: authError } = await supabase.auth.updateUser({
        data: { ...user.user_metadata, nome: nomeAtualizado },
      });

      if (authError) {
        setErro("Nome atualizado, mas não foi possível sincronizar o perfil.");
        return false;
      }

      setNome(nomeAtualizado);
      setSucesso("Nome atualizado com sucesso.");
      return true;
    } catch {
      setErro("Não foi possível atualizar o nome. Tente novamente.");
      return false;
    } finally {
      setSalvandoNome(false);
    }
  };

  const alterarSenha = async (senhaAtual, novaSenha, confirmarSenha) => {
    setErro("");
    setSucesso("");

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos de senha.");
      return false;
    }

    if (novaSenha.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    if (!/[0-9]/.test(novaSenha) || !/[A-Za-z]/.test(novaSenha)) {
      setErro("A nova senha deve conter letras e números.");
      return false;
    }

    if (/\s/.test(novaSenha)) {
      setErro("A nova senha não pode conter espaços.");
      return false;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("A confirmação não coincide com a nova senha.");
      return false;
    }

    if (!user?.email) {
      setErro("Não foi possível identificar o usuário.");
      return false;
    }

    setSalvandoSenha(true);

    try {
      const { error: validacaoError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: senhaAtual,
      });

      if (validacaoError) {
        setErro("A senha atual está incorreta.");
        return false;
      }

      const { error: senhaError } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (senhaError) {
        setErro("Não foi possível alterar a senha. Tente novamente.");
        return false;
      }

      setSucesso("Senha alterada com sucesso.");
      return true;
    } catch {
      setErro("Não foi possível alterar a senha. Tente novamente.");
      return false;
    } finally {
      setSalvandoSenha(false);
    }
  };

  return {
    nome,
    setNome,
    email,
    carregando,
    salvandoNome,
    salvandoSenha,
    erro,
    sucesso,
    salvarNome,
    alterarSenha,
  };
}
