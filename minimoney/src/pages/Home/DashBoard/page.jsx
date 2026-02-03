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
  PieChart
} from "recharts";

import { useDashboardFilters } from "../../../hooks/useDashboardFilters";
import { useCategorias } from "../../../hooks/useCategorias";
import { useResumoFinanceiro } from "../../../hooks/useResumoFinanceiro";
import { useResumoMensal } from "../../../hooks/useResumoMensal";

function Dashboard() {
  const filtros = useDashboardFilters();

  const categorias = useCategorias();
  const resumo = useResumoFinanceiro(filtros);
  const resumoMensal = useResumoMensal(filtros);

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor || 0);

  const formatarPercentual = (valor) =>
    `${((valor || 0) * 100).toFixed(2)}%`;

  const formatarMes = (data) => {
    const [ano, mes] = data.split("-");
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    }).format(new Date(ano, mes - 1, 1));
  };

  const resumoMensalFormatado = resumoMensal.map(item => ({
    name: formatarMes(item.mes),
    receitas: item.receitas,
    despesas: item.despesas
  }));

  return (
    <div className="Card-DashBoard">
      <div className="Card-Central-DashBoard">
        <div className="Card-Filtros-DashBoard">
          <div className="Filtros-DashBoard">
            <div className="linha-filtros">
              <div className="campo-filtro">
                <label>Período</label>
                <select
                  value={filtros.periodo}
                  onChange={(e) => filtros.setPeriodo(e.target.value)}
                >
                  <option value="mes_atual">Este mês</option>
                  <option value="ultimos_30_dias">Últimos 30 dias</option>
                </select>
              </div>

              <div className="campo-filtro">
                <label>Data Inicial</label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => {
                    filtros.setPeriodo("personalizado");
                    filtros.setDataInicio(e.target.value);
                  }}
                />
              </div>

              <div className="campo-filtro">
                <label>Data Final</label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => {
                    filtros.setPeriodo("personalizado");
                    filtros.setDataFim(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="linha-filtros">
              <div className="campo-filtro">
                <label>Tipo</label>
                <select
                  value={filtros.tipo}
                  onChange={(e) => filtros.setTipo(e.target.value)}
                >
                  <option value={null}>Todos</option>
                  <option value="E">Receitas</option>
                  <option value="S">Despesas</option>
                </select>
              </div>

              <div className="campo-filtro">
                <label>Categoria</label>
                <select
                  value={filtros.categoria}
                  onChange={(e) => filtros.setCategoria(e.target.value)}
                >
                  <option value={null}>Todas</option>
                  {categorias.map(cat => (
                    <option key={cat.ID} value={cat.ID}>
                      {cat.DESCRICAO}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* ================= VISUAL ================= */}
        <div className="Card-Visual-DashBoard">

          {/* ===== RESUMO ===== */}
          <div className="Card-Resumo">
            <div className="Resumo-Item Positivo">
              <FaArrowUp className="Icone" />
              <div>
                <label>Receitas</label>
                <span>{formatarMoeda(resumo?.total_receitas)}</span>
              </div>
            </div>

            <div className="Resumo-Item Negativo">
              <FaArrowDown className="Icone" />
              <div>
                <label>Despesas</label>
                <span>{formatarMoeda(resumo?.total_despesas)}</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <IoWallet className="Icone" />
              <div>
                <label>Diferença</label>
                <span>{formatarMoeda(resumo?.diferenca)}</span>
              </div>
            </div>

            <div className="Resumo-Item Positivo">
              <FaArrowCircleUp className="Icone" />
              <div>
                <label>Economia</label>
                <span>{formatarPercentual(resumo?.percentual_economia)}</span>
              </div>
            </div>
          </div>

          {/* ===== GRÁFICOS ===== */}
          <div className="Card-Graficos-DashBoard">

            <div className="EvolucaoFinanceira">
              <h1>Evolução Financeira</h1>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resumoMensalFormatado}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Tooltip />
                  <Line dataKey="receitas" name="Receitas" />
                  <Line dataKey="despesas" name="Despesas" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="DistribuicaoCategorias">
              <h1>Distribuição por Categoria</h1>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resumo?.por_categoria || []}
                    dataKey="valor"
                    nameKey="categoria"
                    innerRadius={70}
                    outerRadius={110}
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
