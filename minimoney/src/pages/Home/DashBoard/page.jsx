import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseCliente";
import { IoWallet } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import "./DashBoard.css";

import {ResponsiveContainer, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip} from 'recharts';
import { Pie, PieChart} from 'recharts';


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

  const dataCategoria = [ 
    { name: 'Alimentação', value: 400, fill: '#8884d8' },
    { name: 'Transporte', value: 300, fill: '#82ca9d' },
    { name: 'Lazer', value: 300, fill: '#ffc658' },
    { name: 'Outras', value: 200, fill: '#ff8040' },
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
                <label>Tipo</label>
                <select>
                  <option value="">Todos</option>
                  <option value="E">Receitas</option>
                  <option value="S">Despesas</option>
                </select>
              </div>
              
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
            </div>
          </div>
        </div>


        <div className="Card-Visual-DashBoard">          
          <div className="Card-Resumo">            
            <div className="Resumo-Item Positivo">
              <div className="Resumo-Icone">
                <FaArrowUp className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Receita do mês</label>
                <span>R$ 6.200,00</span>
              </div>
            </div>
            
            <div className="Resumo-Item Negativo">
              <div className="Resumo-Icone">
                <FaArrowDown className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Despesas do Mês</label>
                <span>R$ 2.750,00</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <div className="Resumo-Icone">  
                <IoWallet className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Saldo Atual</label>
                <span>R$ 3.450,00</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <div className="Resumo-Icone">
                <FaArrowCircleUp className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Economia</label>
                <span>+12%</span>
              </div>              
            </div>
          </div>

          <div className="Card-Graficos-DashBoard">
            <div className="EvolucaoFinanceira">
              <div className="Titulo">
                <h1>Evolução Financeira</h1>
              </div>
              <ResponsiveContainer width="100%" height="100%" >
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" />
                    <YAxis width="auto"/>
                    <Legend />
                    <Line name="Receitas" type="monotone" dataKey="pv" stroke="green" activeDot={{ r: 8 }} />
                    <Line name="Despesas" type="monotone" dataKey="uv" stroke="red" activeDot={{ r: 8 }}/>
                    <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="DistribuicaoCategorias">
              <div className="Titulo">
                <h1>Distribuição por Categoria</h1>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={'100%'} height={'100%'} >
                  <Pie
                    data={dataCategoria}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                    cornerRadius={8}
                    label
                    >
                  <Legend 
                    align="right"
                    layout="vertical"
                    verticalAlign="middle"/>
                  </Pie>   
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
