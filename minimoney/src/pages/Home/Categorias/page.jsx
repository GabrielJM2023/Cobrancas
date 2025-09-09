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
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Usuário não autenticado");
      return;
    }

    console.log(user.id);

    const { data, error } = await supabase
      .from("Categoria")
      .insert([
        { Nome: Nome, Tipo: Tipo, FK_ID_Usuario: user.id }, 
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
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    console.log(user.id); 

    const {data : usuario, errorUsuario } = await supabase
      .from('Usuario')
      .select('id, Nome')
      .eq('FK_user_id', user.id)
      .single();
    
    if (errorUsuario) {
      console.error("Erro ao carregar usuário", errorUsuario.message);
      return;
    }

    console.log(usuario.id);

    const { data: categorias, errorCategorias } = await supabase
      .from('Categoria')
      .select('id,        '+
              'Nome,      '+
              'Tipo       ').eq('FK_ID_Usuario', usuario.id);

    if (errorCategorias) {
      console.error("Erro ao carregar categorias", errorCategorias.message);
      return;
    }

    if (!categorias) {
      console.log("Nenhuma categoria encontrada");
      return;
    }

    console.log(categorias);
    setCategorias(categorias); // atualiza o estado
  } catch (e) {
    console.error("Erro inesperado ao carregar categorias", e.message);
  }
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
