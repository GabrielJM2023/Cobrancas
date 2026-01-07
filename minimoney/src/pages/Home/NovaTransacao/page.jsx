import React, { useState, useEffect } from "react";
import './NovaTransacao.css';
import Button from "../../../Components/Button/button";
import { supabase } from '../../../lib/supabaseCliente';

function NovaTransacao() {
  const [Transacaos, setTransacaos] = useState([]); 
  const [selecionada, setSelecionada] = useState(null); 
  const [pErro, setMensagemErro] = useState('');  

  const IncluirTransacao = async () => {
    setSelecionada({ id:"", Tipo: "G", Valor: 0, Data: '', Descricao: ''});    
  };

  const handleChange = (e) => {
    setSelecionada({
      ...selecionada,
      [e.target.name]: e.target.value,
    });
  };

  const salvarTransacao = () => {
    if (!selecionada.Valor || selecionada.Valor <= 0) {
      setMensagemErro("O valor da transação é obrigatório");
      return;
    }

    if (selecionada?.id) {
      AlterarTransacao(selecionada);
    } else {
      CadastrarTransacao(selecionada);
    }
  };

  const AlterarTransacao = async ({ id, Tipo, Valor, Data, Descricao }) => {
    console.log(id, ' ', Tipo,' ', Valor,' ', Data,' ', Descricao);

    const { data, error } = await supabase
    .from('Transacao')
    .update({ Tipo: Tipo, Valor: Valor, Data: Data, Descricao: Descricao })
    .eq('id', id)
    .select();

    if(error) {
      console.error("Erro ao alterar transação", error.message);
      return;
    }

    CarregarTransacao();
  };

  const CadastrarTransacao = async ({ Tipo, Valor, Data, Descricao }) => {
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
      .from('Transacao')
      .insert([
        { FK_ID_Usuario: usuario.id, Tipo: selecionada.Tipo, Valor: selecionada.Valor, Data: selecionada.Data, Descricao: selecionada.Descricao },
      ])
      .select()
  
      if(error){
      console.log("Erro ao cadastrar nova transação: " + error.message)  
      }

      CarregarTransacao();
    };

  const CarregarTransacao = async () => {
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

      const { data: Transacao, errorTransacao } = await supabase
        .from('Transacao')
        .select('id,        '+
                'Tipo,      '+
                'Valor,     '+
                'Data,      '+
                'Descricao ').eq('FK_ID_Usuario', usuario.id);
      if (errorTransacao) {
        console.error("Erro ao carregar transações", errorTransacao.message);
        return;
      }

      if (!Transacao) {
        console.log("Nenhuma transação encontrada");
        return;
      }

      console.log(Transacao);
      setTransacaos(Transacao); 
    } catch (e) {
      console.error("Erro inesperado ao carregar transações", e.message);
    }
  };

  const excluirTransacao = async (id) => {
    const { error } = await supabase
      .from("Transacao")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir Transacao", error.message);
    }
 
    CarregarTransacao();
    NovaTransacao(); 
  };

  return (
    <div className="Card-NovaTransacao">
      <div className="NT-card-central">
        <div className="NT-card-esquerda">
          <h2>Lista</h2>
          <div className="lista-NovaTransacao">            
          </div>
        </div>

        <div className="NT-card-direita">
          <h2>Detalhes</h2>

          {selecionada ? (
          <>
            <label>Tipo</label>
            <select
              name="Tipo"
              value={selecionada.Tipo}
              onChange={handleChange}
            >
              <option value="G">Gasto</option>
              <option value="E">Receita</option>
            </select>

            <div className="NT-Grupo">
              <div className="campo campo-valor">
                <label>Valor</label>
                <div className="input-valor">
                  <span>R$</span>
                  <input
                    type="text"
                    name="valor"
                    placeholder="0,00"
                    value={selecionada.Nome}
                  />
                </div>
              </div>

              <div className="campo campo-data">
                <label>Data</label>
                <input
                  type="date"
                  name="data"
                  value={selecionada.data}
                />
              </div>
            </div>

            <div className="campo-descricao">
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={selecionada.descricao}
                placeholder="Digite uma descrição detalhada..."
                rows={3}
              />
            </div>

            <div className="botoes">
              <Button children="Excluir" onClick={() => excluirTransacao(selecionada.id)} />
              <Button children="Salvar" onClick={salvarTransacao}/>
            </div>              
            <div className="mensagemErro">
              <p>{pErro || ''}</p>
            </div>              
          </>
          ) : (
            <div className="nenhuma-selecionada">
              <p>Selecione uma transação</p>
              <Button children="Nova Transação" onClick={IncluirTransacao} />
            </div>
          )}          
        </div>
      </div>
    </div>
  );
}

export default NovaTransacao;
