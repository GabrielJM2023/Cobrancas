import { IoWallet } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import "./DashBoard.css";

import {ResponsiveContainer, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip} from 'recharts';
import { Pie, PieChart} from 'recharts';

import { supabase } from '../../../lib/supabaseCliente';
import { useEffect, useState } from "react";

function Dashboard() {
  const [resumo, setResumo] = useState(null);
  const [resumoMensal, setResumoMensal] = useState([]);

  useEffect(() => {
    Resumo();
    ResumoMensal();
  }, []);

  const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  const formatarMes = (data) =>
  new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(data));

  const formatarPercentual = (valor) =>
  `${(valor * 100).toFixed(2)}%`;

  const ResumoMensal = async () =>{
    try{
      const {data:{user}} = await supabase.auth.getUser();
      if(!user){
        console.error("Usuário não autenticado");
        return;
      }
      const {data : usuario, errorUsuario } = await supabase
        .from('Usuario')
        .select('id, Nome')
        .eq('FK_user_id', user.id)
        .single();
      if (errorUsuario) {
        console.error("Erro ao carregar usuário", errorUsuario.message);
        return;
      }

      const { data, error } = await supabase
        .rpc('resumo_mensal', { p_usuario: usuario.id });

      if (error) {
        console.error(error);
        return;
      }

      setResumoMensal(data);
    }catch(error){
      console.error("Erro ao carregar resumo mensal: " + error.message)
    }
  }
  
  const Resumo = async () => {
    try{
      const {data:{user}} = await supabase.auth.getUser();
      if(!user){
        console.error("Usuário não autenticado");
        return;
      }
      if (!user) {
        console.error("Usuário não autenticado");
        return;
      }

      const {data : usuario, errorUsuario } = await supabase
        .from('Usuario')
        .select('id, Nome')
        .eq('FK_user_id', user.id)
        .single();

      if (errorUsuario) {
        console.error("Erro ao carregar usuário", errorUsuario.message);
        return;
      }
      const { data, error } = await supabase
        .rpc('resumo_financeiro', { p_usuario: usuario.id }).single();

      if (error) {
        console.error(error);
        return;
      }     
      
      setResumo(data);
    }catch(error){
      console.error("Erro ao carregar resumo financeiro: " + error.message)
    }
  }

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
            <div className="Campo-Filtro">
              <div className="linha-filtros">
                <div className="campo-filtro">
                  <label>Mes</label>
                  <select>
                    <option value="">Todos</option>
                    <option value="J">Janeiro</option>
                    <option value="F">Fevereiro</option>
                    <option value="M">Março</option>
                    <option value="A">Abril</option>
                    <option value="M">Maio</option>
                    <option value="J">Junho</option>                    
                  </select>
                </div>

                <div className="campo-filtro">
                  <label>Ano</label>
                  <select>
                    <option value="">Todos</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>                    
                  </select>
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
        </div>


        <div className="Card-Visual-DashBoard">          
          <div className="Card-Resumo">            
            <div className="Resumo-Item Positivo">
              <div className="Resumo-Icone">
                <FaArrowUp className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Receita do mês</label>
                <span>{formatarMoeda(resumo?.total_receitas || 0)}</span>
              </div>
            </div>
            
            <div className="Resumo-Item Negativo">
              <div className="Resumo-Icone">
                <FaArrowDown className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Despesas do Mês</label>
                <span>{formatarMoeda(resumo?.total_despesas || 0)}</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <div className="Resumo-Icone">  
                <IoWallet className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Diferença</label>
                <span>{formatarMoeda(resumo?.diferenca || 0)}</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <div className="Resumo-Icone">
                <FaArrowCircleUp className="Icone"/>
              </div>
              <div className="Informacoes">
                <label>Economia</label>
                <span>{formatarPercentual(resumo?.percentual_economia || 0)}</span>
              </div>              
            </div>
          </div>

          <div className="Card-Graficos-DashBoard">
            <div className="EvolucaoFinanceira">
              <div className="Titulo">
                <h1>Evolução Financeira</h1>
              </div>
              <ResponsiveContainer width="100%" height="100%" >
                <LineChart data={resumoMensal}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" />
                    <YAxis width="auto"/>
                    <Legend />
                    <Line name="Receitas" type="monotone" dataKey="receitas" stroke="green" activeDot={{ r: 8 }} />
                    <Line name="Despesas" type="monotone" dataKey="despesas" stroke="red" activeDot={{ r: 8 }}/>
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
