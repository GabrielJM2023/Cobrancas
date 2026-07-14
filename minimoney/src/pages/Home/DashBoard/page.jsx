import "./DashBoard.css";

import { IoWallet } from "react-icons/io5";
import { FaArrowUp, FaArrowDown, FaArrowCircleUp } from "react-icons/fa";
import {
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { ThreeDot, Riple } from "react-loading-indicators";

import { useDashboardFilters } from "../../../hooks/useDashboardFilters";
import { useCategorias } from "../../../hooks/useCategorias";
import { useResumoFinanceiro } from "../../../hooks/useResumoFinanceiro";
import { useEvolucaoFinanceira } from "../../../hooks/useEvolucaoFinanceira";
import { useDistribuicaoCategoria } from "../../../hooks/useDistribuicaoCategoria";
import { useUserId } from "../../../hooks/useUserID";

const formatarMoeda = (valor) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor || 0);

const formatarPercentual = (valor) => `${((valor || 0) * 100).toFixed(2)}%`;

const formatarMes = (data) => {
  const [ano, mes] = data.split("-");
  return new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
    new Date(ano, mes - 1, 1)
  );
};

function CardResumo({ titulo, valor, icone: Icone, variante, carregando }) {
  return (
    <article className={`resumo-item ${variante}`}>
      {carregando ? (
        <div className="carregando-resumo">
          <ThreeDot variant="pulsate" color="#2f9e9e" size="medium" />
        </div>
      ) : (
        <>
          <Icone className="resumo-icone" aria-hidden="true" />
          <div className="resumo-item-conteudo">
            <span>{titulo}</span>
            <strong>{valor}</strong>
          </div>
        </>
      )}
    </article>
  );
}

function Dashboard() {
  const filtros = useDashboardFilters();
  const userId = useUserId();
  const categorias = useCategorias(filtros.tipo);
  const { resumo, carregando } = useResumoFinanceiro(filtros, userId);
  const evolucaoFinanceira = useEvolucaoFinanceira(filtros, userId);
  const distribuicaoCategoria = useDistribuicaoCategoria(filtros);

  const evolucaoFinanceiraFormatado = (evolucaoFinanceira.resumo || []).map(
    (item) => ({
      name: formatarMes(item.mes),
      receitas: item.receitas,
      despesas: item.despesas,
    })
  );

  return (
    <div className="Card-DashBoard">
      <main className="dashboard-card" aria-labelledby="titulo-dashboard">
        <header className="dashboard-header">
          <h1 id="titulo-dashboard">Visão geral</h1>
          <p>Acompanhe o resultado das suas finanças.</p>
        </header>

        <section className="dashboard-filtros" aria-label="Filtros do dashboard">
          <div className="dashboard-campo-filtro">
            <label htmlFor="periodo-dashboard">Período</label>
            <select
              id="periodo-dashboard"
              value={filtros.periodo}
              onChange={(e) => filtros.setPeriodo(e.target.value)}
            >
              <option value="mes_atual">Este mês</option>
              <option value="ultimos_30_dias">Últimos 30 dias</option>
            </select>
          </div>

          <div className="dashboard-campo-filtro">
            <label htmlFor="data-inicial-dashboard">Data inicial</label>
            <input
              id="data-inicial-dashboard"
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => {
                filtros.setPeriodo("personalizado");
                filtros.setDataInicio(e.target.value);
              }}
            />
          </div>

          <div className="dashboard-campo-filtro">
            <label htmlFor="data-final-dashboard">Data final</label>
            <input
              id="data-final-dashboard"
              type="date"
              value={filtros.dataFim}
              onChange={(e) => {
                filtros.setPeriodo("personalizado");
                filtros.setDataFim(e.target.value);
              }}
            />
          </div>

          <div className="dashboard-campo-filtro">
            <label htmlFor="tipo-dashboard">Tipo</label>
            <select
              id="tipo-dashboard"
              value={filtros.tipo || ""}
              onChange={(e) => {
                filtros.setTipo(e.target.value || null);
                filtros.setCategoria("");
              }}
            >
              <option value="">Todos</option>
              <option value="E">Receitas</option>
              <option value="S">Despesas</option>
            </select>
          </div>

          <div className="dashboard-campo-filtro">
            <label htmlFor="categoria-dashboard">Categoria</label>
            <select
              id="categoria-dashboard"
              value={filtros.categoria || ""}
              onChange={(e) => filtros.setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {categorias.map((categoria) => (
                <option key={categoria.ID} value={categoria.ID}>
                  {categoria.NOME}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="dashboard-resumo" aria-label="Resumo financeiro">
          <CardResumo
            titulo="Receitas"
            valor={formatarMoeda(resumo?.total_receitas)}
            icone={FaArrowUp}
            variante="receita"
            carregando={carregando}
          />
          <CardResumo
            titulo="Despesas"
            valor={formatarMoeda(resumo?.total_despesas)}
            icone={FaArrowDown}
            variante="despesa"
            carregando={carregando}
          />
          <CardResumo
            titulo="Diferença"
            valor={formatarMoeda(resumo?.diferenca)}
            icone={IoWallet}
            variante="saldo"
            carregando={carregando}
          />
          <CardResumo
            titulo="Economia"
            valor={formatarPercentual(resumo?.percentual_economia)}
            icone={FaArrowCircleUp}
            variante="saldo"
            carregando={carregando}
          />
        </section>

        <section className="dashboard-graficos" aria-label="Gráficos financeiros">
          <article className="dashboard-grafico evolucao-financeira">
            <header>
              <h2>Evolução financeira</h2>
            </header>
            <div className="dashboard-grafico-conteudo">
              {evolucaoFinanceira.carregando ? (
                <div className="carregando-resumo">
                  <Riple color="#2f9e9e" size="large" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolucaoFinanceiraFormatado} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.25)" />
                    <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                    <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                    <Tooltip formatter={(valor) => formatarMoeda(valor)} />
                    <Legend />
                    <Line dataKey="receitas" name="Receitas" stroke="#18b566" strokeWidth={3} type="monotone" />
                    <Line dataKey="despesas" name="Despesas" stroke="#ff4d4d" strokeWidth={3} type="monotone" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </article>

          <article className="dashboard-grafico distribuicao-categorias">
            <header>
              <h2>Distribuição por categoria</h2>
            </header>
            <div className="dashboard-grafico-conteudo">
              {evolucaoFinanceira.carregando ? (
                <div className="carregando-resumo">
                  <Riple color="#2f9e9e" size="large" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribuicaoCategoria || []}
                      dataKey="valor"
                      nameKey="nome"
                      innerRadius={58}
                      outerRadius={92}
                      paddingAngle={2}
                    >
                      {distribuicaoCategoria?.map((entrada, index) => (
                        <Cell key={`${entrada.nome}-${index}`} fill={entrada.cor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(valor) => formatarMoeda(valor)} />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
