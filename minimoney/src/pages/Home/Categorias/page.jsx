import React, { useState, useEffect } from "react";
import './Categorias.css';
import Button from "../../../Components/Button/button";
import { supabase } from '../../../lib/supabaseCliente';

function Categorias() {
  const [categorias, setCategorias] = useState([]); 
  const [selecionada, setSelecionada] = useState(null); 
  const [pErro, setMensagemErro] = useState('');

  useEffect(() => {
    CarregarCategorias();
  }, []);

  const CadastrarCategoria = async ({ Nome, Tipo }) => {
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

    const { data, error } = await supabase
    .from('Categoria')
    .insert([
      { Nome: selecionada.Nome, FK_ID_Usuario: usuario.id, Tipo: selecionada.Tipo },
    ])
    .select()

    if(error){
    console.log("Erro ao cadastrar nova categoria: " + error.message)  
    }

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


  const AlterarCategoria = async ({ id, Nome, Tipo }) => {
    console.log(id, Nome, Tipo);

    const { data, error } = await supabase
    .from('Categoria')
    .update({ Nome: Nome, Tipo: Tipo })
    .eq('id', id)
    .select();

    if (error) {
      console.error("Erro ao alterar categoria", error.message);
      return;
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
    novaCategoria();
  };

  const handleChange = (e) => {
    setSelecionada({
      ...selecionada,
      [e.target.name]: e.target.value,
    });
  };

  const salvarCategoria = () => {
    if (!selecionada.Nome || selecionada.Nome.trim() === ""){
      setMensagemErro("O nome da categoria é obrigatório");
      return;
    }

    if (selecionada?.id) {
      AlterarCategoria(selecionada);
    } else {
      CadastrarCategoria(selecionada);
    }

    novaCategoria();
    setMensagemErro('');
  };

  const novaCategoria = async () => {
    setSelecionada({ id:"", Nome: "", Tipo: "G" });    
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

              <div className="mensagemErro">
                <p>{pErro || ''}</p>
              </div>
              <div className="botoes">
                <Button
                  children="Excluir"
                  onClick={() => excluirCategoria(selecionada.id)}
                />
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
