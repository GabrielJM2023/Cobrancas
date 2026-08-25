import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button/button";
import { MdOutlineEmail } from "react-icons/md";

import { useResetPassword } from "../../hooks/useResetPassword";

import "./Login.css";

function EsqueciSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const {
    enviarEmail,
    loading,
    error,
    sucesso,
  } = useResetPassword();
      
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    await enviarEmail(email);
  };

  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit}>
        <div className="card-Login">
          <div className="card-Central-Login">
            <div className="Logar">
              <h1>Recuperar senha</h1>
              <p>
                Informe seu e-mail e enviaremos um link
                para você redefinir sua senha.
              </p>
            </div>
            <div className="input-group login">
              <label>Email</label>

              <div className="input-wrapper">
                <MdOutlineEmail className="icon" />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mensagemErro">
                <p>{error}</p>
              </div>
            )}

            {sucesso && (
              <div className="mensagemSucesso">
                <p>
                  E-mail enviado! Verifique sua caixa de entrada.
                </p>
              </div>
            )}

            <div className="card-Button login">

              <Button
                type="button"
                onClick={() => navigate("/")}
              >
                Voltar
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar link"}
              </Button>

            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default EsqueciSenha;