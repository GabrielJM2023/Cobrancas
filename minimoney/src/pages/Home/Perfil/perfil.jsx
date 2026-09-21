import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../../../Components/Button/button";
import { usePerfil } from "../../../hooks/usePerfil";
import "./perfil.css";

function Perfil() {
  const {
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
  } = usePerfil();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const enviarNome = async (event) => {
    event.preventDefault();
    await salvarNome();
  };

  const enviarSenha = async (event) => {
    event.preventDefault();
    const alterada = await alterarSenha(senhaAtual, novaSenha, confirmarSenha);

    if (alterada) {
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    }
  };

  if (carregando) {
    return <div className="Perfil"><p>Carregando perfil...</p></div>;
  }

  return (
    <main className="Perfil">
      <section className="perfil-card" aria-labelledby="titulo-perfil">
        <header className="perfil-cabecalho">
          <h1 id="titulo-perfil">Perfil</h1>
          <p>Atualize seus dados e mantenha sua conta segura.</p>
        </header>

        <form className="perfil-formulario" onSubmit={enviarNome}>
          <h2>Dados pessoais</h2>

          <div className="input-group">
            <label htmlFor="nome-perfil">Nome</label>
            <div className="input-wrapper">
              <FaUser className="icon" />
              <input
                id="nome-perfil"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email-perfil">E-mail</label>
            <div className="input-wrapper">
              <MdOutlineEmail className="icon" />
              <input id="email-perfil" value={email} disabled />
            </div>
          </div>

          <Button type="submit" disabled={salvandoNome || salvandoSenha}>
            {salvandoNome ? "Salvando..." : "Salvar nome"}
          </Button>
        </form>

        <form className="perfil-formulario" onSubmit={enviarSenha}>
          <h2>Alterar senha</h2>
          <p className="perfil-ajuda">Confirme sua senha atual para escolher uma nova.</p>

          <div className="input-group">
            <label htmlFor="senha-atual">Senha atual</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                id="senha-atual"
                type="password"
                value={senhaAtual}
                onChange={(event) => setSenhaAtual(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="nova-senha-perfil">Nova senha</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                id="nova-senha-perfil"
                type="password"
                value={novaSenha}
                onChange={(event) => setNovaSenha(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmar-senha-perfil">Confirmar nova senha</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                id="confirmar-senha-perfil"
                type="password"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={salvandoNome || salvandoSenha}>
            {salvandoSenha ? "Alterando..." : "Alterar senha"}
          </Button>
        </form>

        {erro && <p className="perfil-mensagem erro">{erro}</p>}
        {sucesso && <p className="perfil-mensagem sucesso">{sucesso}</p>}
      </section>
    </main>
  );
}

export default Perfil;
