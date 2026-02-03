import { useEffect, useState } from "react";

export function useDashboardFilters() {
  const [periodo, setPeriodo] = useState('mes_atual');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [tipo, setTipo] = useState('');
  const [categoria, setCategoria] = useState('');

  const aplicarPeriodo = (p) => {
    const hoje = new Date();
    let inicio, fim;

    switch (p) {
      case 'mes_atual':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        break;

      case 'ultimos_30_dias':
        fim = new Date();
        inicio = new Date();
        inicio.setDate(fim.getDate() - 30);
        break;

      default:
        return;
    }

    setDataInicio(inicio.toISOString().split('T')[0]);
    setDataFim(fim.toISOString().split('T')[0]);
  };

  useEffect(() => {
    aplicarPeriodo(periodo);
  }, [periodo]);

  return {
    periodo, setPeriodo,
    dataInicio, setDataInicio,
    dataFim, setDataFim,
    tipo, setTipo,
    categoria, setCategoria
  };
}
