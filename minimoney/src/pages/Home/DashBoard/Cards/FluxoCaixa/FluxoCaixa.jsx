import "./FluxoCaixa.css";
import { useState } from 'react';
import Card from '../../../../../Components/Card/Card'
import { useFluxoCaixa } from './useFluxoCaixa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function FluxoCaixa() {   
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState(anoAtual);
    
    const anos = [];
    for (let ano = anoAtual +2 ; ano >= 2020; ano--) {
        anos.push(ano);
    }

    const { dados } = useFluxoCaixa(ano); 

    const dadosGrafico = dados.reduce((acc, item) => {
    let mes = acc.find((x) => x.MES === item.MES);

    if (!mes) {
        mes = {
            MES: item.MES,
            Entrada: 0,
            Saida: 0
        };

        acc.push(mes);
    }

    mes[item.TIPO] = Math.abs(Number(item.VALOR));

    return acc;
}, []); 
  return (
    <Card className="custom-card">
      <div className="chart-header">
        <h3>Fluxo de Caixa</h3>
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
                <BarChart data={dadosGrafico}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="MES" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="Entrada"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                    />

                    <Bar
                        dataKey="Saida"
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
  );
}

export default FluxoCaixa;
