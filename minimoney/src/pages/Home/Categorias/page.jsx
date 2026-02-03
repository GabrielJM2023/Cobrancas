import React, { useState, useEffect } from "react";
import "./Categorias.css";
import Button from "../../../Components/Button/button";
import { supabase } from "../../../lib/supabaseCliente";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [pErro, setMensagemErro] = useState("");

  useEffect(() => {
    CarregarCategorias();
  }, []);

  /* ===================== CARREGAR ===================== */
  const CarregarCategorias = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario, error } = await supabase
      .from("USUARIO")
      .select("ID")
      .eq("USER_ID_FK", user.id)
      .single();

    if (error) return;

    const { data, error: errorCategorias } = await supabase
      .from("CATEGORIA")
      .select("ID, NOME, TIPO")
      .eq("ID_USUARIO_FK", usuario.ID)
      .order("NOME", { ascending: true });

    if (!errorCategorias) setCategorias(data);
  };

  /* ===================== CADASTRAR ===================== */
  const CadastrarCategoria = async ({ NOME, TIPO }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario } = await supabase
      .from("USUARIO")
      .select("ID")
      .eq("USER_ID_FK", user.id)
      .single();

    await supabase.from("CATEGORIA").insert({
      NOME,
      TIPO,
      ID_USUARIO_FK: usuario.ID,
    });

    CarregarCategorias();
  };

  /* ===================== ALTERAR ===================== */
  const AlterarCategoria = async ({ ID, NOME, TIPO }) => {
    await supabase
      .from("CATEGORIA")
      .update({ NOME, TIPO })
      .eq("ID", ID);

    CarregarCategorias();
  };

  /* ===================== EXCLUIR ===================== */
  const excluirCategoria = async (ID) => {
    await supabase.from("CATEGORIA").delete().eq("ID", ID);
    setSelecionada(null);
    CarregarCategorias();
  };

  /* ===================== FORM ===================== */
  const handleChange = (e) => {
    setSelecionada({
      ...selecionada,
      [e.target.name]: e.target.value,
    });
  };

  const salvarCategoria = () => {
    if (!selecionada.NOME?.trim()) {
      setMensagemErro("O nome da categoria é obrigatório");
      return;
    }

    selecionada.ID
      ? AlterarCategoria(selecionada)
      : CadastrarCategoria(selecionada);

    setSelecionada(null);
    setMensagemErro("");
  };

  const novaCategoria = () => {
    setSelecionada({ ID: null, NOME: "", TIPO: "S" });
  };

  /* ===================== JSX ===================== */
  return (
    <div className="Card-Categorias">
      <div className="CC-card-central">
        <div className="CC-card-esquerda">
          <h2>Lista</h2>

          <div className="lista-categorias">
            {categorias.map((cat) => (
              <div
                key={cat.ID}
                className={`item-categoria ${
                  selecionada?.ID === cat.ID ? "ativo" : ""
                }`}
                onClick={() => setSelecionada(cat)}
              >
                <span className="nome">{cat.NOME}</span>
                <span
                  className={`tipo ${
                    cat.TIPO === "E" ? "receita" : "gasto"
                  }`}
                >
                  {cat.TIPO === "E" ? "Receita" : "Gasto"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="CC-card-direita">
          <h2>Detalhes</h2>

          {selecionada ? (
            <>
              <label>Nome</label>
              <input
                type="text"
                name="NOME"
                value={selecionada.NOME}
                onChange={handleChange}
              />

              <label>Tipo</label>
              <select
                name="TIPO"
                value={selecionada.TIPO}
                onChange={handleChange}
              >
                <option value="S">Gasto</option>
                <option value="E">Receita</option>
              </select>

              <div className="mensagemErro">{pErro}</div>

              <div className="botoes">
                {selecionada.ID && (
                  <Button
                    children="Excluir"
                    onClick={() => excluirCategoria(selecionada.ID)}
                  />
                )}
                <Button children="Salvar" onClick={salvarCategoria} />
              </div>
            </>
          ) : (
            <div className="nenhuma-selecionada-Categoria">
              <p>Selecione uma categoria</p>
              <Button children="Nova Categoria" onClick={novaCategoria} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categorias;
