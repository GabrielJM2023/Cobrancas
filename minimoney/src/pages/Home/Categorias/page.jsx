import React, { useState, useEffect } from "react";
import "./Categorias.css";
import Button from "../../../Components/Button/button";
import { supabase } from "../../../lib/supabaseCliente";
import { Riple } from "react-loading-indicators";
import { FaFilePen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [pErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    CarregarCategorias();
  }, []);

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

  /* ===================== CARREGAR ===================== */
  const CarregarCategorias = async () => {
    setCarregando(true);
    try{
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data: usuario, error } = await supabase
        .from("USUARIO")
        .select("ID_AUTH_FK")
        .eq("ID_AUTH_FK", user.id)
        .single();

      if (error) return;

      const { data, error: errorCategorias } = await supabase
        .from("CATEGORIA")
        .select("ID, NOME, TIPO")
        .eq("ID_USUARIO_FK", usuario.ID_AUTH_FK)
        .order("NOME", { ascending: true });

      if (!errorCategorias) setCategorias(data || []);
    }finally {
      setCarregando(false);
    }
  };

  /* ===================== CADASTRAR ===================== */
  const CadastrarCategoria = async ({ NOME, TIPO }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario } = await supabase
      .from("USUARIO")
      .select("ID_AUTH_FK")
      .eq("ID_AUTH_FK", user.id)
      .single();

    await supabase.from("CATEGORIA").insert({
      NOME,
      TIPO,
      ID_USUARIO_FK: usuario.ID_AUTH_FK,
    });

    await CarregarCategorias();
  };

  /* ===================== ALTERAR ===================== */
  const AlterarCategoria = async ({ ID, NOME, TIPO }) => {
    await supabase
      .from("CATEGORIA")
      .update({ NOME, TIPO })
      .eq("ID", ID);

    await CarregarCategorias();
  };

  /* ===================== EXCLUIR ===================== */
  const excluirCategoria = async (ID) => {
    await supabase.from("CATEGORIA").delete().eq("ID", ID);
    fecharModal();
    await CarregarCategorias();
  };

  /* ===================== FORM ===================== */
  
  const salvarCategoria = async () => {
  if (!categoriaEditando.NOME.trim()) {
    setMensagemErro("O nome da categoria é obrigatório");
    return;
  }

  if (categoriaEditando.ID)
    await AlterarCategoria(categoriaEditando);
  else
    await CadastrarCategoria(categoriaEditando);

  fecharModal();
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
            {carregando ?
              (
                <div className="carregando-Categoria">
                  <Riple
                    color="#2f9e9e"
                    size="large"
                  />
                </div>
              ) : (
                <div className="lista-categorias scroll-custom">
                  {categorias.map(cat => (
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
                <label>Nome</label>
                <input
                    name="NOME"
                    value={categoriaEditando.NOME}
                    onChange={handleChange}
                />

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

                <div className="botoes">

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
