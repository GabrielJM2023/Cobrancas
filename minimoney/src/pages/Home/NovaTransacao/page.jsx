import React, { useMemo, useState } from "react";
import "./NovaTransacao.css";
import Button from "../../../Components/Button/button";
import { NumericFormat } from "react-number-format";
import { FaFilePen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { Riple } from "react-loading-indicators";

import { useDashboardFilters } from "../../../hooks/useDashboardFilters";
import { useCategorias } from "../../../hooks/useCategorias";
import { useTransacaoQuery } from "../../../hooks/useTransacaoQuery";
import { useNovaTransacao } from "../../../hooks/useNovaTransacao";

const formatarMoeda = (valor) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(valor) || 0);

const formatarData = (data) => {
  if (!data) return "Sem data";

  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(`${data}T00:00:00`)
  );
};

function NovaTransacao() {
  const filtros = useDashboardFilters();
  const [selecionada, setSelecionada] = useState(null);
  const [pErro, setMensagemErro] = useState("");
  const [busca, setBusca] = useState("");
  const categoriasFiltro = useCategorias(filtros.tipo);
  const categoriasFormulario = useCategorias(selecionada?.TIPO);
  const transacaoGrid = useTransacaoQuery(filtros);
  const transacaoCampo = useNovaTransacao();

  const transacoesVisiveis = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    if (!termo) return transacaoGrid.transacoes;

    return transacaoGrid.transacoes.filter((transacao) =>
      [transacao.DESCRICAO, transacao.CATEGORIA?.NOME]
        .filter(Boolean)
        .some((valor) => valor.toLocaleLowerCase("pt-BR").includes(termo))
    );
  }, [busca, transacaoGrid.transacoes]);

  const fecharModal = () => {
    setSelecionada(null);
    setMensagemErro("");
  };

  const incluirTransacao = () => {
    setSelecionada({
      ID: null,
      TIPO: "S",
      VALOR: 0,
      DATA: "",
      DESCRICAO: "",
      PARCELA: 1,
      ID_CATEGORIA_FK: "",
    });
    setMensagemErro("");
  };

  const editarTransacao = (transacao) => {
    setSelecionada({ ...transacao });
    setMensagemErro("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelecionada((anterior) => {
      if (name === "TIPO") {
        return { ...anterior, TIPO: value, ID_CATEGORIA_FK: "" };
      }

      return { ...anterior, [name]: value };
    });
  };

  const salvarTransacao = async () => {
    if (!selecionada.VALOR || selecionada.VALOR <= 0) {
      setMensagemErro("Informe um valor válido");
      return;
    }

    if (!selecionada.ID_CATEGORIA_FK) {
      setMensagemErro("Selecione uma categoria");
      return;
    }

    if (!selecionada.DATA) {
      setMensagemErro("Informe uma data");
      return;
    }

    if (selecionada.PARCELA < 1) {
      setMensagemErro("A parcela deve ser no mínimo 1");
      return;
    }

    if (selecionada.PARCELA > 99) {
      setMensagemErro("A parcela deve ser no máximo 99");
      return;
    }

    await transacaoCampo.salvar(selecionada);
    fecharModal();
    transacaoGrid.carregar();
  };

  const excluirTransacao = async () => {
    await transacaoCampo.excluir(selecionada.ID);
    fecharModal();
    transacaoGrid.carregar();
  };

  return (
    <div className="Card-NovaTransacao">
      <section className="transacoes-card" aria-labelledby="titulo-transacoes">
        <header className="transacoes-header">
          <div className="transacoes-header-info">
            <h1 id="titulo-transacoes">Transações</h1>
          </div>

          <div className="transacoes-acoes">
            <div className="transacoes-search">
              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Pesquisar transação..."
                aria-label="Pesquisar transação"
              />
            </div>

            <Button
              onClick={incluirTransacao}
              className="btn-nova-transacao"
              aria-label="Nova transação"
            >
              <IoMdAdd className="transacao-icone" />
            </Button>
          </div>
        </header>

        <div className="transacoes-filtros" aria-label="Filtros de transações">
          <div className="campo-filtro">
            <label htmlFor="periodo">Período</label>
            <select
              id="periodo"
              value={filtros.periodo}
              onChange={(e) => filtros.setPeriodo(e.target.value)}
            >
              <option value="mes_atual">Este mês</option>
              <option value="ultimos_30_dias">Últimos 30 dias</option>
            </select>
          </div>

          <div className="campo-filtro">
            <label htmlFor="data-inicial">Data inicial</label>
            <input
              id="data-inicial"
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => {
                filtros.setPeriodo("personalizado");
                filtros.setDataInicio(e.target.value);
              }}
            />
          </div>

          <div className="campo-filtro">
            <label htmlFor="data-final">Data final</label>
            <input
              id="data-final"
              type="date"
              value={filtros.dataFim}
              onChange={(e) => {
                filtros.setPeriodo("personalizado");
                filtros.setDataFim(e.target.value);
              }}
            />
          </div>

          <div className="campo-filtro">
            <label htmlFor="tipo-filtro">Tipo</label>
            <select
              id="tipo-filtro"
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

          <div className="campo-filtro">
            <label htmlFor="categoria-filtro">Categoria</label>
            <select
              id="categoria-filtro"
              value={filtros.categoria || ""}
              onChange={(e) => filtros.setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {categoriasFiltro.map((categoria) => (
                <option key={categoria.ID} value={categoria.ID}>
                  {categoria.NOME}
                </option>
              ))}
            </select>
          </div>
        </div>

        {transacaoGrid.carregando ? (
          <div className="carregando-NovaTransacao">
            <Riple color="#2f9e9e" size="large" />
          </div>
        ) : transacoesVisiveis.length > 0 ? (
          <div className="lista-NovaTransacao scroll-custom">
            {transacoesVisiveis.map((transacao) => (
              <button
                key={transacao.ID}
                type="button"
                className="item-NovaTransacao"
                onClick={() => editarTransacao(transacao)}
              >
                <span className="transacao-principal">
                  <strong>{transacao.DESCRICAO || "Sem descrição"}</strong>
                  <small>{transacao.CATEGORIA?.NOME || "Sem categoria"}</small>
                </span>

                <span className="transacao-detalhes">
                  <span
                    className={`badge-transacao ${
                      transacao.TIPO === "S" ? "gasto" : "receita"
                    }`}
                  >
                    {transacao.TIPO === "S" ? "Gasto" : "Receita"}
                  </span>
                  <span className="data-transacao">{formatarData(transacao.DATA)}</span>
                  <strong
                    className={`valor-transacao ${
                      transacao.TIPO === "S" ? "gasto" : "receita"
                    }`}
                  >
                    {formatarMoeda(transacao.VALOR)}
                  </strong>
                  <FaFilePen className="editar-transacao" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="carregando-NovaTransacao">
            <p>Nenhuma transação encontrada</p>
          </div>
        )}
      </section>

      {selecionada && (
        <div className="transacoes-modal-overlay" onMouseDown={fecharModal}>
          <section
            className="transacoes-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-transacao"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 id="titulo-modal-transacao">
              {selecionada.ID ? "Editar transação" : "Nova transação"}
            </h2>

            <div className="form-linha">
              <div className="campo">
                <label htmlFor="tipo">Tipo</label>
                <select id="tipo" name="TIPO" value={selecionada.TIPO} onChange={handleChange}>
                  <option value="S">Gasto</option>
                  <option value="E">Receita</option>
                </select>
              </div>

              <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select
                  id="categoria"
                  name="ID_CATEGORIA_FK"
                  value={selecionada.ID_CATEGORIA_FK}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {categoriasFormulario.map((categoria) => (
                    <option key={categoria.ID} value={categoria.ID}>
                      {categoria.NOME}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-linha form-linha-tres">
              <div className="campo">
                <label htmlFor="valor">Valor da parcela</label>
                <NumericFormat
                  id="valor"
                  value={selecionada.VALOR}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  onValueChange={(values) =>
                    setSelecionada((anterior) => ({
                      ...anterior,
                      VALOR: values.floatValue || 0,
                    }))
                  }
                />
              </div>

              <div className="campo">
                <label htmlFor="data">Data</label>
                <input
                  id="data"
                  type="date"
                  name="DATA"
                  value={selecionada.DATA}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label htmlFor="parcela">Parcela</label>
                <input
                  id="parcela"
                  type="number"
                  min={1}
                  max={99}
                  step={1}
                  value={selecionada.PARCELA}
                  onChange={(e) =>
                    setSelecionada((anterior) => ({
                      ...anterior,
                      PARCELA: Number(e.target.value) || 1,
                    }))
                  }
                />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="DESCRICAO"
                value={selecionada.DESCRICAO}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {pErro && <p className="mensagemErro">{pErro}</p>}

            <div className="botoes-transacao">
              {selecionada.ID && <Button onClick={excluirTransacao}>Excluir</Button>}
              <Button onClick={fecharModal}>Cancelar</Button>
              <Button onClick={salvarTransacao}>Salvar</Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default NovaTransacao;
