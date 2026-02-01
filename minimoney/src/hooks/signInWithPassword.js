import { useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setMensagemErro] = useState(null);
  const navigate = useNavigate();

  const ValidaCamposLogin = (email, senha) => {
    if (!email) {
      return "Por favor, preencha o email.";
      }

      if (!senha) {
        return "Por favor, preencha a senha.";
      }

      return null; 
  }

  const Login = async(email, senha) => {
    setMensagemErro('');

    const msgErro = ValidaCamposLogin(email, senha);
    if (msgErro) {
      setMensagemErro(msgErro);
      return;
    }

    try {    
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });
      setLoading(false);
                        
      if (error) {
        console.error(error);                

        console.error("Erro ao logar:", error.message);
        if (error.message.includes("Invalid login credentials")) {
          setMensagemErro("Email ou senha inválidos.");
        } else if (error.message.includes("Email not confirmed")) {
          setMensagemErro("Confirme o email!");    
        }else{
          setMensagemErro("Erro ao tentar logar. Tente novamente.");
        }
        return false;
      } 

      if (!data.user) {
          setMensagemErro("Não foi possível encontrar este usuário.");
          setLoading(false);
          return;
      }

      navigate('/Home/Dashboard');     
      } catch (e) {
        console.error("Erro inesperado:", e.message);
        setMensagemErro("Erro inesperado. Tente novamente mais tarde.");
      }
    }
    return { Login, loading, error, setError: setMensagemErro };
}
