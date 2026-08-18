import "./GastoCategoria.css";
import { useState } from 'react';
import Card from '../../../../../Components/Card/Card'
import { useGastoCategoria } from './useGastoCategoria';
import { useValores } from '../../../../../context/ValoresContext';

function GastoCategoria() {   
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState(anoAtual);
    const anos = [];
    for (let ano = anoAtual +2 ; ano >= 2020; ano--) {
        anos.push(ano);
    }
    const mesAtual = new Date().getMonth() + 1;
    const [mes, setMes] = useState(mesAtual);
    const { dados } = useGastoCategoria(ano, mes);    
    const { valoresVisiveis } = useValores();
  return (
    <Card className="custom-card">
        <div className="chart-header">
            <h3>Gasto por Categoria</h3>
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

        <div className="categorias-body">
            <div className="categorias-lista">
                {dados.map((item) => (
                    <div className="categoria-item" key={item.categoria}>
                        <div className="categoria-header">
                            <span>{item.categoria}</span>
                            <span>{item.percentual}%</span>
                        </div>

                        <div className="categoria-barra">
                            <div
                                className="categoria-barra-preenchida"
                                style={{
                                    width: `${item.percentual}%`
                                }}
                            />
                        </div>

                        <div className="categoria-valor">
                            {valoresVisiveis ? (
                                `R$ ${Number(item.valor).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2
                                })}`
                            ) : (
                                "••••••••"
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </Card>
  );
}

export default GastoCategoria;
