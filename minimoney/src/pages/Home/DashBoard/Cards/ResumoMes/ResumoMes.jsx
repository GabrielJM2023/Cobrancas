import "./ResumoMes.css";
import Card from '../../../../../Components/Card/Card'
import { useResumoMes } from './useResumoMes';
import { useState } from 'react';
import { useValores } from '../../../../../context/ValoresContext';

import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Cell,
    Sector
} from 'recharts';

function ResumoMes() {   
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState(anoAtual);
    
    const anos = [];
    for (let ano = anoAtual +2 ; ano >= 2020; ano--) {
        anos.push(ano);
    }
    
    const { valoresVisiveis } = useValores();  

    const mesAtual = new Date().getMonth() + 1;
    const [mes, setMes] = useState(mesAtual);
    const { dados } = useResumoMes(ano, mes);
    const [activeIndex, setActiveIndex] = useState(0);
    const coresTipo = {
        E: "#22c55e",
        S: "#ef4444",
        T: "#3b82f6"
    };

    const nomesTipo = {
        E: "Entradas",
        S: "Saídas",
        T: "Transferências"
    };
    const renderActiveShape = (props) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload
        } = props;

    const valor = Number(payload.VALOR);
    const tipo = nomesTipo[payload.TIPO_TRANSACAO];
        return (
            <g>
                <text
                    x={cx}
                    y={cy - 8}
                    textAnchor="middle"
                    fill={fill}
                    fontSize={16}
                    fontWeight={600}
                >
                    {tipo}
                </text>

                <text
                    x={cx}
                    y={cy + 18}
                    textAnchor="middle"
                    fill="var(--color-text)"
                    fontSize={14}
                >
                    {valoresVisiveis ? (
                        `R$ ${valor.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2
                        })}`
                    ) : (
                        "••••••••"
                    )}
                </text>

                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />

                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

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
                outerRadius="75%"
                dataKey="VALOR"
                nameKey="TIPO"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                isAnimationActive={true}
            >
                {dados.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={coresTipo[entry.TIPO_TRANSACAO]}
                    />
                ))}
            </Pie>

            </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default ResumoMes;
