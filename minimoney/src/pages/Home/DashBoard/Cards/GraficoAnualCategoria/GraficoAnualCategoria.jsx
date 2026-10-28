
import "./GraficoAnualCategoria.css";
import { useState, useMemo } from "react";
import Card from "../../../../../Components/Card/Card";
import { useCategoriaAnual } from "./useGraficoAnualCategoria";
import { useValores } from "../../../../../context/ValoresContext";
import { Riple } from "react-loading-indicators";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const MESES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

function GraficoAnualCategoria({ pUserId }) {
  const anoAtual = new Date().getFullYear();

  const [ano, setAno] = useState(anoAtual);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const { dados, carregando } = useCategoriaAnual(ano, { pUserId });
  const { valoresVisiveis } = useValores();

  const anos = useMemo(() => {
    const lista = [];

    for (let item = anoAtual + 2; item >= 2020; item--) {
      lista.push(item);
    }

    return lista;
  }, [anoAtual]);

  const { dadosGrafico, categorias } = useMemo(() => {
    const mapa = new Map();
    const conjuntoCategorias = new Set();

    for (const item of dados ?? []) {
      const categoria = item.categoria ?? "Sem categoria";
      const mes = Number(item.MES);
      const valor = Number(item.valor) || 0;

      if (mes < 1 || mes > 12 || !Number.isInteger(mes)) {
        continue;
      }

      conjuntoCategorias.add(categoria);

      if (!mapa.has(mes)) {
        mapa.set(mes, {
          MES: mes,
          mesNome: MESES[mes - 1]
        });
      }

      mapa.get(mes)[categoria] = valor;
    }

    const categoriasOrdenadas = [...conjuntoCategorias].sort(
      (a, b) => a.localeCompare(b, "pt-BR")
    );

    const dadosFormatados = MESES.map((mesNome, indice) => {
      const mes = indice + 1;

      const registro = mapa.get(mes) ?? {
        MES: mes,
        mesNome
      };

      for (const categoria of categoriasOrdenadas) {
        registro[categoria] ??= 0;
      }

      return registro;
    });

    return {
      dadosGrafico: dadosFormatados,
      categorias: categoriasOrdenadas
    };
  }, [dados]);

  const cores = useMemo(
    () =>
      categorias.map(
        (_, indice) => `hsl(${(indice * 67) % 360}, 60%, 45%)`
      ),
    [categorias]
  );

  const formatarValor = (valor) => {
    if (!valoresVisiveis) return "••••••";

    return `R$ ${Number(valor).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const selecionarCategoria = (categoria) => {
    setCategoriaSelecionada((atual) =>
      atual === categoria ? null : categoria
    );
  };

  const tratarCliqueLegenda = (evento) => {
    if (evento?.value) {
      selecionarCategoria(evento.value);
    }
  };

  return (
    <Card className="custom-card">
      <div className="chart-header">
        <h3>Gastos por categoria</h3>

        <div className="chart-filters">
          <select
            value={ano}
            onChange={(e) => {
              setAno(Number(e.target.value));
              setCategoriaSelecionada(null);
            }}
            aria-label="Selecionar ano"
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
        {carregando ? (
          <div className="carregando">
            <Riple color="#2f9e9e" size="large" />
          </div>
        ) : categorias.length === 0 ? (
          <div className="carregando">
            Nenhum gasto encontrado para {ano}.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dadosGrafico}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="mesNome" />

              <YAxis
                tickFormatter={(valor) =>
                  valoresVisiveis
                    ? `R$ ${Number(valor).toLocaleString("pt-BR")}`
                    : "••••"
                }
              />
              
              <Tooltip
                labelFormatter={(mes) => `Mês: ${mes}`}
                formatter={(valor, categoria) => [
                  formatarValor(valor),
                  categoria
                ]}
                active={categoriaSelecionada !== null}
                filterNull
                content={({ active, payload, label }) => {
                  if (
                    categoriaSelecionada === null ||
                    !active ||
                    !payload?.length
                  ) {
                    return null;
                  }

                  const dadosFiltrados = payload.filter(
                    (item) => item.dataKey === categoriaSelecionada
                  );

                  if (!dadosFiltrados.length) {
                    return null;
                  }

                  return (
                    <div className="custom-tooltip">
                      <p className="tooltip-label">Mês: {label}</p>

                      {dadosFiltrados.map((item) => (
                        <div
                          key={item.dataKey}
                          style={{
                            color: item.color,
                            marginTop: "4px"
                          }}
                        >
                          <strong>{item.name}:</strong>{" "}
                          {formatarValor(item.value)}
                        </div>
                      ))}
                    </div>
                  );
                }}
              />

              <Legend
                onClick={tratarCliqueLegenda}
                cursor="pointer"
                formatter={(valor) => (
                  <span
                    style={{
                      color:
                        categoriaSelecionada === null ||
                        categoriaSelecionada === valor
                          ? "inherit"
                          : "#999",
                      fontWeight:
                        categoriaSelecionada === valor
                          ? "bold"
                          : "normal",
                      cursor: "pointer"
                    }}
                  >
                    {valor}
                  </span>
                )}
              />

              {categorias.map((categoria, indice) => {
                const selecionada =
                  categoriaSelecionada === categoria;

                const outraSelecionada =  
                  categoriaSelecionada !== null && !selecionada;

                return (
                  <Line
                    key={categoria}
                    type="monotone"
                    dataKey={categoria}
                    name={categoria}
                    stroke={cores[indice]}
                    strokeWidth={selecionada ? 4 : 2}
                    strokeOpacity={outraSelecionada ? 0.15 : 1}
                    dot={selecionada}
                    activeDot={{
                      r: 6,
                      onClick: () => {
                        selecionarCategoria(categoria);
                      }
                    }}
                    onClick={() => selecionarCategoria(categoria)}
                    connectNulls={false}
                    style={{ cursor: "pointer" }}
                    isAnimationActive={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

export default GraficoAnualCategoria;
