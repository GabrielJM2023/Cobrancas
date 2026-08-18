import "./GraficoAnualPatrimonio.css";
import { useState } from 'react';
import Card from '../../../../../Components/Card/Card'
import { usePatrimonioAnual } from './usePatrimonioAnual';
import { useValores } from '../../../../../context/ValoresContext';

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
    const { valoresVisiveis } = useValores();

    const anos = [];
    for (let ano = anoAtual +2 ; ano >= 2020; ano--) {
        anos.push(ano);
    }
    const dadosGraficoFormatados = dados.map((item) => ({
        ...item,
        Entrada: valoresVisiveis ? item.Entrada : 0,
        Saida: valoresVisiveis ? item.Saida : 0
    }));
    const formatarValor = (valor) => {
        if (!valoresVisiveis) {
            return "••••••";
        }

        return `R$ ${Number(valor).toLocaleString("pt-BR", {
            minimumFractionDigits: 2
        })}`;
    };
  return (
    <Card className="custom-card">
      <div className="chart-header">
        <h3>Evolução do Patrimônio</h3>
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
        </div>
      </div>

      <div className="chart-body">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dadosGraficoFormatados}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis 
                dataKey="MES"
                tickFormatter={(mes) => `${mes}`}
              />

              <YAxis
                tickFormatter={(valor) =>
                    valoresVisiveis
                        ? `R$ ${Number(valor).toLocaleString("pt-BR")}`
                        : "••••"
                }
              />

              <Tooltip
                formatter={(valor) => formatarValor(valor)}
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
