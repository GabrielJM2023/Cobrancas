import React, { useState } from "react";
import "./Cadastro.css";
import Button from "../../Components/Button/button";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useCadastro } from "../../hooks/singUp";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { cadastroUsuario, loading, error, setError } = useCadastro();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await cadastroUsuario(nome, email, senha);
  };

  const handleVoltar = () => {
    setError(null); 
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-Cadastro">
        <div className="card-Central">
          <div className="Cadastrar">
            <h1>Cadastrar</h1>
          </div>

          <div className="input-group">
            <label>Nome</label>
            <IoPersonCircleOutline className="icon" />
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <MdOutlineEmail className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {error && (
            <div className="mensagemErro">
              <p>{error}</p>
            </div>
          )}

          <div className="card-Button">
            <Button onClick={handleVoltar}>Voltar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
