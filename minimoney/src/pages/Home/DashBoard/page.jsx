import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseCliente";
import Button from "../../../Components/Button/button";

// ================== Shape ativo do Pie ==================

export default function Dashboard() {
    <div className="Card-DashBoard">
        <div>
            <h1>DashBoard</h1>
            <div>
                <labe>Data Inicial</labe>                
                <input type="date"/>
                <label>Data Final</label>
                <input type="date"/>
                <label>Categoria</label>
                <select>
                    <option value="">Todas</option>
                    <option value="A">Alimentação</option>
                    <option value="T">Transporte</option>
                </select>
                <label>Tipo</label>
                <select>
                    <option value="">Todos</option>
                    <option value="E">Receitas</option>
                    <option value="S">Despesas</option>
                </select>
            </div>
        </div>   
    </div>
}
