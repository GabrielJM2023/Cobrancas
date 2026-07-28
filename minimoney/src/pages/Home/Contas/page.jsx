import React, { useState } from "react";
import "./Conta.css";
import Button from "../../../Components/Button/button";
import { Riple } from "react-loading-indicators";
import { FaFilePen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useContaQuery } from "../../../hooks/useContaQuery";
import { useNovaConta } from "../../../hooks/useNovaConta";

function Conta() {
  const [pErro, setMensagemErro] = useState("");
  const [ContaEditando, setContaEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const ContaGrid = useContaQuery();
  const ContaCampo = useNovaConta();

  const fecharModal = () => {
    setContaEditando(null);
    setModalAberto(false);
    setMensagemErro("");
  };

  const novaConta = () => {
  setContaEditando({
    ID: null,
    NOME: "",
    ATIVO: true,
  });

  setModalAberto(true);
  setMensagemErro("");
};

const editarConta = (Conta) => {
  setContaEditando({ ...Conta });
  setModalAberto(true);
  setMensagemErro("");
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setContaEditando({
    ...ContaEditando,
    [name]: type === "checkbox" ? checked : value,
  });
};

  const excluirConta = async (ID) => {
    await ContaCampo.excluir(ID);
    fecharModal();
    ContaGrid.carregar();
  };

  /* ===================== FORM ===================== */
  
  const salvarConta = async () => {
  if (!ContaEditando.NOME.trim()) {
    setMensagemErro("O nome da Conta é obrigatório");
    return;
  }

  await ContaCampo.salvar(ContaEditando);

  fecharModal();
  ContaGrid.carregar();
};

  /* ===================== JSX ===================== */
  return (
    <div className="Card-Conta">
      <div className="Conta-card">
        <div className="Conta-header">
          <div  className="Conta-header-info">
            <h1>Conta</h1>
          </div>
          <div className="Conta-acoes">
            <div className="Conta-search">
              <input placeholder="Pesquisar Conta..." />
            </div>      
            <div className="Conta-container-btn-nova">  
              <Button
                  onClick={novaConta}
                  className="btn-nova-Conta">
                <IoMdAdd className="Conta-Icone"/>
              </Button>                
            </div>
          </div>        
        </div>
            {ContaGrid.carregando ?
              (
                <div className="carregando-Conta">
                  <Riple
                    color="#2f9e9e"
                    size="large"
                  />
                </div>
              ) : (
                <div className="lista-Conta scroll-custom">
                  {ContaGrid.Conta.map(cat => (
                    <div
                      key={cat.ID}
                      className="item-Conta"                      
                    >                      
                      <h3>{cat.NOME}</h3>
                      <span
                        className={`badge ${
                          cat.ATIVO ? "ativo" : "inativo"
                        }`}
                      >
                        {cat.ATIVO ? "Ativa" : "Inativa"}
                      </span>
                      <FaFilePen className="editar-Conta" onClick={() => editarConta(cat)}/>
                    </div>
                  ))}
            </div>
          )
        }
    </div>
    {modalAberto && (
        <div className="modal-overlay">
            <div className="modal">
                <h2>
                    {ContaEditando.ID
                        ? "Editar Conta"
                        : "Nova Conta"}
                </h2>
                <div className="input-group">
                    <label>Nome</label>
                    <div className="input-wrapper input-Conta">
                      <input
                          name="NOME"
                          value={ContaEditando.NOME}
                          onChange={handleChange}
                      />
                    </div>
                </div>
                <div className="input-group">
                <label>
                  <input
                    type="checkbox"
                    checked={ContaEditando.ATIVO}
                    onChange={(e) =>
                      setContaEditando({
                        ...ContaEditando,
                        ATIVO: e.target.checked,
                      })
                    }
                  />
                  Conta ativa
                </label>
              </div>          
                <p className="mensagemErro">
                    {pErro}
                </p>
                <div className="botoes-Conta">
                    {ContaEditando.ID && (
                        <Button
                            children="Excluir"
                            onClick={() => excluirConta(ContaEditando.ID)}
                        />
                    )}
                    <Button
                        children="Cancelar"
                        onClick={fecharModal}
                    />
                    <Button
                        children="Salvar"
                        onClick={salvarConta}
                    />
                </div>
            </div>
        </div>
    )}
</div>
)
}

export default Conta;
