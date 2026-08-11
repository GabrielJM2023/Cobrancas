import "./GraficoAnualPatrimonio.css";
import { useState } from 'react';
import Card from '../../../../../Components/Card/Card'
import { usePatrimonioAnual } from './usePatrimonioAnual';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { ResponsiveContainer } from 'recharts';

function GraficoAnualPatrimonio() {   
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState(anoAtual);
    const { dados } = usePatrimonioAnual(ano);


    const anos = [];
    for (let ano = anoAtual +2 ; ano >= 2020; ano--) {
        anos.push(ano);
    }

  return (
    <Card className="custom-card">
      <div className="chart-header">
        <h3>Evolução do Patrimônio</h3>
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
      </div>

      <div className="chart-body">
          <ResponsiveContainer width="100%" height="100%">
  <LineChart data={dados}>
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis 
      dataKey="MES"
      tickFormatter={(mes) => `${mes}`}
    />

    <YAxis
      tickFormatter={(valor) =>
        `R$ ${(valor / 1000).toFixed(0)}k`
      }
    />

    <Tooltip
      formatter={(valor) =>
        [
          `R$ ${Number(valor).toLocaleString("pt-BR", {
            minimumFractionDigits: 2
          })}`,
          "Patrimônio"
        ]
      }
    />

    <Line 
      type="monotone"
      dataKey="PATRIMONIO"
      strokeWidth={3}
    />
      </LineChart>
      </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default GraficoAnualPatrimonio;
