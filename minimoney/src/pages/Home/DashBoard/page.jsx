import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseCliente";
import Button from "../../../Components/Button/button";
import "./DashBoard.css";

function Dashboard() {

  return (
    <div className="Card-DashBoard">
      <div className="Card-Central-DashBoard">
        <div className="Card-Filtros-DashBoard">
          <div className="Titulo">
            <h1>Dashboard</h1>
          </div>

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
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
