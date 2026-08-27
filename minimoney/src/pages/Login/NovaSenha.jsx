import React from "react";
import Button from "../../Components/Button/button";

import { FaLock } from "react-icons/fa";

import { useNovaSenha } from "../../hooks/useNovaSenha";

import "./Login.css";

function NovaSenha() {
  const {
    novaSenha,
    setNovaSenha,
    confirmarSenha,
    setConfirmarSenha,
    alterarSenha,
    loading,
    error,
    recuperacao,
  } = useNovaSenha();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await alterarSenha();
  };

  if (!recuperacao) {
    return (
      <div className="LoginPage">
        <div className="card-Login">
          <div className="card-Central-Login">

            <div className="Logar">
              <h1>Link inválido</h1>

              <p>
                O link de recuperação não é válido ou
                já expirou.
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit}>
        <div className="card-Login">
          <div className="card-Central-Login">

            <div className="Logar">
              <h1>Nova senha</h1>

              <p>
                Digite sua nova senha para continuar.
              </p>
            </div>

            <div className="input-group login">
              <label>Nova senha</label>

              <div className="input-wrapper">
                <FaLock className="icon" />

                <input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group login">
              <label>Confirmar senha</label>

              <div className="input-wrapper">
                <FaLock className="icon" />

                <input
                  type="password"
                  placeholder="Confirmar senha"
                  value={confirmarSenha}
                  onChange={(e) =>
                    setConfirmarSenha(e.target.value)
                  }
                />
              </div>
            </div>

            {error && (
              <div className="mensagemErro">
                <p>{error}</p>
              </div>
            )}

            <div className="card-Button login">
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Alterando..." : "Alterar senha"}
              </Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default NovaSenha;