import React, { useState, useEffect } from "react";
import './Categorias.css';
import Button from "../../../Components/Button/button";
import { supabase } from '../../../lib/supabaseCliente';

function Categorias() {
  const [categorias, setCategorias] = useState([]); 
  const [selecionada, setSelecionada] = useState(null); 

  useEffect(() => {
    CarregarCategorias();
  }, []);

  const CadastrarCategoria = async ({ Nome, Tipo }) => {
    // pegar usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Usuário não autenticado");
      return;
    }

    const { data, error } = await supabase
      .from("Categoria")
      .insert([
        { Nome: Nome, Tipo: Tipo, FK_ID_Usuario: user.id }, // FK do usuário
      ])
      .select();

    if (error) {
      console.error("Erro ao cadastrar categoria", error.message);
      return;
    }

    // recarregar lista
    CarregarCategorias();
  };

  const CarregarCategorias = async () => {
    let { data, error } = await supabase.from("Categoria").select("*");
    if (error) {
      console.error("Erro ao carregar categorias", error.message);
      return;
    }
    setCategorias(data);
  };

  const AlterarCategoria = async ({ Id, Nome, Tipo }) => {
    const { data, error } = await supabase
      .from("Categoria")
      .update({ Nome: Nome, Tipo: Tipo })
      .eq("id", Id)
      .select();

    if (error) {
      console.error("Erro ao alterar categoria", error.message);
    }

    CarregarCategorias();
  };

  const excluirCategoria = async (id) => {
    const { error } = await supabase
      .from("Categoria")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir categoria", error.message);
    }

    CarregarCategorias();
  };

  const handleChange = (e) => {
    setSelecionada({
      ...selecionada,
      [e.target.name]: e.target.value,
    });
  };

  const salvarCategoria = () => {
    if (selecionada?.id) {
      AlterarCategoria(selecionada);
    } else {
      CadastrarCategoria(selecionada);
    }
  };

  const novaCategoria = () => {
    setSelecionada({ nome: "", tipo: "Gasto" });
  };

  return (
    <div className="Card-Categorias">
      <div className="CC-card-central">
        <div className="CC-card-esquerda">
          <h2>Lista</h2>
          <div className="lista-categorias">
            {categorias.map((cat) => (
              <div
                key={cat.id}
                className={`item-categoria ${
                  selecionada?.id === cat.id ? "ativo" : ""
                }`}
                onClick={() => setSelecionada(cat)}
              >
                {cat.Nome}
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
                name="Nome"
                value={selecionada.Nome}
                onChange={handleChange}
              />

              <label>Tipo</label>
              <select
                name="Tipo"
                value={selecionada.Tipo}
                onChange={handleChange}
              >
                <option value="G">Gasto</option>
                <option value="E">Receita</option>
              </select>

              <div className="botoes">
                {selecionada.id && (
                  <Button
                    children="Excluir"
                    onClick={() => excluirCategoria(selecionada.id)}
                  />
                )}
                <Button children="Salvar" onClick={salvarCategoria} />                
              </div>
            </>
          ) : (
            <div className="nenhuma-selecionada">
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
