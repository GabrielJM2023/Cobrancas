import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseCliente";
import { IoWallet } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import "./DashBoard.css";

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip} from 'recharts';


function Dashboard() {
  const data = [
    { name: 'Janeiro', uv: 4000, pv: 2400 },
    { name: 'Fevereiro', uv: 3000, pv: 1398 },
    { name: 'Março', uv: 2000, pv: 9800 },
    { name: 'Abril', uv: 4000, pv: 3908 },
    { name: 'Maio', uv: 6000, pv: 4800 },
    { name: 'Junho', uv: 1000, pv: 3800 },  
    { name: 'Jul', uv: 3000, pv: 0},
  ];
  return (
    <div className="Card-DashBoard">
      <div className="Card-Central-DashBoard">
        <div className="Card-Filtros-DashBoard">
          <div className="Titulo">
            <h1>Dashboard</h1>
          </div>
          
          <div className="Filtros-DashBoard">
            <div className="linha-filtros">
              <div className="campo-filtro">
                <label>Data Inicial</label>
                <input type="date" />
              </div>

              <div className="campo-filtro">
                <label>Data Final</label>
                <input type="date" />
              </div>
            </div>
            <div className="linha-filtros">
              <div className="campo-filtro">
                <label>Categoria</label>
                <select>
                  <option value="">Todas</option>
                  <option value="A">Alimentação</option>
                  <option value="T">Transporte</option>
                  <option value="L">Lazer</option>
                  <option value="O">Outras</option>
                </select>
              </div>

              <div className="campo-filtro">
                <label>Tipo</label>
                <select>
                  <option value="">Todos</option>
                  <option value="E">Receitas</option>
                  <option value="S">Despesas</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="Card-Visual-DashBoard">          
          <div className="Card-Resumo">            
            <div className="Resumo-Item Positivo">
              <FaArrowUp className="Icone"/>
              <div className="Informacoes">
                <label>Receita do mês</label>
                <span>R$ 6.200,00</span>
              </div>
            </div>
            
            <div className="Resumo-Item Negativo">
              <FaArrowDown className="Icone"/>
              <div className="Informacoes">
                <label>Despesas do Mês</label>
                <span>R$ 2.750,00</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <IoWallet className="Icone"/>
              <div className="Informacoes">
                <label>Saldo Atual</label>
                <span>R$ 3.450,00</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <FaArrowCircleUp className="Icone"/>
              <div className="Informacoes">
                <label>Economia</label>
                <span>+12%</span>
              </div>              
            </div>
          </div>

          <div className="Card-Graficos-DashBoard">
            <div className="EvolucaoFinanceira">
              <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name" />
                  <YAxis width="auto"/>
                  <Legend />
                  <Line name="Receitas" type="monotone" dataKey="pv" stroke="green" activeDot={{ r: 8 }} />
                  <Line name="Despesas" type="monotone" dataKey="uv" stroke="red" activeDot={{ r: 8 }}/>
                  <Tooltip />
              </LineChart>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
