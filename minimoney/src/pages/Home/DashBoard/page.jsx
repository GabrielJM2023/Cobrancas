import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseCliente";
import Button from "../../../Components/Button/button";
import "./DashBoard.css";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const data = [
    { name: "Page A", uv: 400 },
    { name: "Page B", uv: 300 },
    { name: "Page C", uv: 320 },
    { name: "Page D", uv: 200 },
    { name: "Page E", uv: 278 },
    { name: "Page F", uv: 189 },
  ];

  return (
    <div className="Card-DashBoard">
      <div className="Card-Central-DashBoard">
        <div className="Card-Filtros-DashBoard">
          <h1>Dashboard</h1>

          <div className="Filtros-DashBoard">
            <div className="Filtro data-inicial"> 
              <label>Data Inicial</label>
              <input type="date" />
            </div>

            <div className="Filtro data-final">
              <label>Data Final</label>
              <input type="date" />
            </div>

            <div className="Filtro categoria">
              <label>Categoria</label>
              <select>
                <option value="">Todas</option>
                <option value="A">Alimentação</option>
                <option value="T">Transporte</option>
                <option value="L">Lazer</option>
                <option value="O">Outras</option>
              </select>
            </div>
            <div className="Filtro tipo">
              <label>Tipo</label>
              <select>
                <option value="">Todos</option>
                <option value="E">Receitas</option>
                <option value="S">Despesas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="Card-Visual-DashBoard">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
