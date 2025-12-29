import React, { useState, useEffect } from "react";
import './NovaTransacao.css';
import Button from "../../../Components/Button/button";
import { supabase } from '../../../lib/supabaseCliente';

function NovaTransacao() {
  const [categorias, setCategorias] = useState([]); 
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

  const salvarCategoria = () => {
    if (!selecionada.Valor || selecionada.Valor <= 0) {
      setMensagemErro("O valor da transação é obrigatório");
      return;
    }

    if()


    if (selecionada?.id) {
      AlterarCategoria(selecionada);
    } else {
      CadastrarCategoria(selecionada);
    }
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
                <Button children="Excluir" />
                <Button children="Salvar" />
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
