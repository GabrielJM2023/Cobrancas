import React, { useState } from "react";
import "./Categorias.css";
import Button from "../../../Components/Button/button";
import { Riple } from "react-loading-indicators";
import { FaFilePen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useCategoriaQuery } from "../../../hooks/useCategoriaQuery";
import { useNovaCategoria } from "../../../hooks/useNovaCategoria";

function Categorias() {
  const [pErro, setMensagemErro] = useState("");
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const categoriaGrid = useCategoriaQuery();
  const categoriaCampo = useNovaCategoria();

  const fecharModal = () => {
    setCategoriaEditando(null);
    setModalAberto(false);
    setMensagemErro("");
  };

  const novaCategoria = () => {
  setCategoriaEditando({
    ID: null,
    NOME: "",
    TIPO: "S",
  });

  setModalAberto(true);
  setMensagemErro("");
};

const editarCategoria = (categoria) => {
  setCategoriaEditando({ ...categoria });
  setModalAberto(true);
  setMensagemErro("");
};

const handleChange = (e) => {
  setCategoriaEditando({
    ...categoriaEditando,
    [e.target.name]: e.target.value,
  });
};

  const excluirCategoria = async (ID) => {
    await categoriaCampo.excluir(ID);
    fecharModal();
    categoriaGrid.carregar();
  };

  /* ===================== FORM ===================== */
  
  const salvarCategoria = async () => {
  if (!categoriaEditando.NOME.trim()) {
    setMensagemErro("O nome da categoria é obrigatório");
    return;
  }

  await categoriaCampo.salvar(categoriaEditando);

  fecharModal();
  categoriaGrid.carregar();
};

  /* ===================== JSX ===================== */
  return (
    <div className="Card-Categorias">
      <div className="categorias-card">
        <div className="categorias-header">
          <div  className="categorias-header-info">
            <h1>Categorias</h1>
          </div>
          <div className="categorias-acoes">
            <div className="categorias-search">
              <input placeholder="Pesquisar categoria..." />
            </div>      
            <div className="categorias-container-btn-nova">  
              <Button
                  onClick={novaCategoria}
                  className="btn-nova-categoria">
                <IoMdAdd className="categoria-Icone"/>
              </Button>                
            </div>
          </div>        
        </div>
            {categoriaGrid.carregando ?
              (
                <div className="carregando-Categoria">
                  <Riple
                    color="#2f9e9e"
                    size="large"
                  />
                </div>
              ) : (
                <div className="lista-categorias scroll-custom">
                  {categoriaGrid.categorias.map(cat => (
                    <div
                      key={cat.ID}
                      className="item-categoria"                      
                    >                      
                      <h3>{cat.NOME}</h3>
                      <span
                        className={`badge ${
                                    cat.TIPO === "E"
                                      ? "receita"
                                      : "gasto"
                              }`}
                      >
                        {cat.TIPO === "E"
                                ? "Receita"
                                : "Gasto"}
                      </span>
                      <FaFilePen className="editar-categoria" onClick={() => editarCategoria(cat)}/>
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
                    {categoriaEditando.ID
                        ? "Editar Categoria"
                        : "Nova Categoria"}
                </h2>
                <div className="input-group">
                    <label>Nome</label>
                    <div className="input-wrapper input-Categoria">
                      <input
                          name="NOME"
                          value={categoriaEditando.NOME}
                          onChange={handleChange}
                      />
                    </div>
                </div>

                <label>Tipo</label>
                  <select
                    name="TIPO"
                    value={categoriaEditando.TIPO}
                    onChange={handleChange}
                  >
                    <option value="S">Gasto</option>
                    <option value="E">Receita</option>
                  </select>
                
                <p className="mensagemErro">
                    {pErro}
                </p>

                <div className="botoes-Categoria">

                    {categoriaEditando.ID && (

                        <Button
                            children="Excluir"
                            onClick={() => excluirCategoria(categoriaEditando.ID)}
                        />

                    )}

                    <Button
                        children="Cancelar"
                        onClick={fecharModal}
                    />

                    <Button
                        children="Salvar"
                        onClick={salvarCategoria}
                    />

                </div>

            </div>

        </div>

    )}

</div>
)
}

export default Categorias;
