import "./ResumoMes.css";
import { useState } from 'react';
import Card from '../../../../../Components/Card/Card'
import { useResumoMes } from './useResumoMes';
import {
    Pie,
    PieChart,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

function ResumoMes() {   
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState(anoAtual);
    
    const anos = [];
    for (let ano = anoAtual +2 ; ano >= 2020; ano--) {
        anos.push(ano);
    }

    const mesAtual = new Date().getMonth() + 1;
    const [mes, setMes] = useState(mesAtual);
    const { dados } = useResumoMes(ano, mes);

  return (
    <Card className="custom-card">
      <div className="chart-header">
        <h3>Resumo do Mês</h3>
        <div className="chart-filters">
          <select
              value={ano}
              onChange={(e) => setAno(Number(e.target.value))}
          >
              {anos.map((item) => (
                  <option key={item} value={item}>
                      {item}
                  </option>
              ))}
          </select>
          <select
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
          >
            <option value={1}>Janeiro</option>
            <option value={2}>Fevereiro</option>
            <option value={3}>Março</option>
            <option value={4}>Abril</option>
            <option value={5}>Maio</option>
            <option value={6}>Junho</option>
            <option value={7}>Julho</option>
            <option value={8}>Agosto</option>
            <option value={9}>Setembro</option>
            <option value={10}>Outubro</option>
            <option value={11}>Novembro</option>
            <option value={12}>Dezembro</option>
          </select>
        </div>
      </div>

      <div className="chart-body">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={dados}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    dataKey="VALOR"
                    nameKey="TIPO"
                    isAnimationActive={true}
                >
                    {dados.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.TIPO === "Entrada" ? "#22c55e" : "#ef4444"}
                        />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(valor) =>
                        `R$ ${Number(valor).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2
                        })}`
                    }
                />
            </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default ResumoMes;
