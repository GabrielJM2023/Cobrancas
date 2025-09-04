import React from "react";
import './NovaTransacao.css';
import Button from "../../../Components/Button/button";

const CarregarCategoria = async () => {
    // Lógica para carregar categorias
}

const GravarTransacao = async () => {
    // Lógica para gravar transação
}

const novaTransacao = async () => {
    // Lógica para nova transação
}

function NovaTransacao() {
  return (
    <div className="NT-CardPrincipal">
      <div className="NT-Card">
        <h1>Nova Transação</h1>
        <div className="NT-Campos">
          
          <div className="NT-CamposLinha">
            <label>Tipo</label>
            <select>
              <option value="">Selecione...</option>
              <option value="A">Alimentação</option>
              <option value="T">Transporte</option>
              <option value="L">Lazer</option>
            </select>
          </div>

          <div className="NT-CamposLinha">
            <label>Data</label>  
            <input type="date" /> 
          </div>

          <div className="NT-CamposLinha">
            <label>Valor</label>
            <input type="number" placeholder="Ex: 120.50" />
          </div>

          <div className="NT-CamposLinha">
            <label>Descrição</label>
            <input type="text" placeholder="Ex: Jantar com amigos" />
          </div>
          
        </div>

        <div className="NT-Botoes">
          <Button children="Salvar" onClick={GravarTransacao} />
          <Button children="Nova Transação" onClick={novaTransacao} />       
          <Button children="Cancelar" onClick={null} />            
        </div>
      </div>
    </div>
  );
}

export default NovaTransacao;
