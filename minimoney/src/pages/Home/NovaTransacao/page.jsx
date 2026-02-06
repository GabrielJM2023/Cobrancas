import React, { useState, useEffect } from "react";
import "./NovaTransacao.css";
import Button from "../../../Components/Button/button";
import { NumericFormat } from "react-number-format";

import { useDashboardFilters } from "../../../hooks/useDashboardFilters";
import { useCategorias } from "../../../hooks/useCategorias";
import { useTransacaoQuery } from "../../../hooks/useTransacaoQuery";
import { useNovaTransacao } from "../../../hooks/useNovaTransacao";

function NovaTransacao() {
  const filtros = useDashboardFilters();
  const [selecionada, setSelecionada] = useState(null);
  const [pErro, setMensagemErro] = useState("");  
  const categorias = useCategorias(filtros.tipo);
  const transacaoGrid = useTransacaoQuery(filtros);
  const transacaoCampo = useNovaTransacao(); 

  useEffect(() => {
    transacaoGrid.carregar(filtros);
  }, [filtros]);

  const IncluirTransacao = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelecionada((prev) => {
      if (name === "TIPO") {
        return { ...prev, TIPO: value, ID_CATEGORIA_FK: "" };
      }
      return { ...prev, [name]: value };
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

    setSelecionada(null);
    setMensagemErro("");
  };

  const excluirTransacao = async (id) => {
    await transacaoCampo.excluir(id);
    setSelecionada(null);
    setMensagemErro("");
  }

  /* ===================== UI ===================== */
  return (
    <div className="Card-NovaTransacao">
      <div className="NT-card-central">
        <div className="Card-Filtros-NovaTransacao">
          <div className="Filtros-NovaTransacao">
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
                  value={filtros.tipo || ""}
                  onChange={(e) => filtros.setTipo(e.target.value || null)}
                >
                  <option value="">Todos</option>
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
                      {cat.NOME}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="NT-card-conteudo">
          <div className="NT-card-esquerda">
            <h2>Lista</h2>

            <div className="lista-NovaTransacao">
              {transacaoGrid.transacoes.map((t) => (
                <div
                  key={t.ID}
                  className={`item-NovaTransacao ${
                    selecionada?.ID === t.ID ? "ativo" : ""
                  }`}
                  onClick={() => setSelecionada(t)}
                >
                  <div className="item-grid">
                    <span className="categoria">{t.CATEGORIA?.NOME}</span>
                    <span className="descricao">{t.DESCRICAO}</span>
                    <span className="data">{t.DATA}</span>
                    <span className={`tipo ${t.TIPO === "S" ? "gasto" : "receita"}`}>
                      {t.TIPO === "S" ? "Gasto" : "Receita"}
                    </span>
                    <span className="valor">R$ {t.VALOR.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="NT-card-direita">
            <h2>Detalhes</h2>

            {selecionada ? (
              <>
                <label>Tipo</label>
                <select
                  name="TIPO"
                  value={selecionada.TIPO}
                  onChange={handleChange}
                >
                  <option value="S">Gasto</option>
                  <option value="E">Receita</option>
                </select>

                <label>Categoria</label>
                <select
                  name="ID_CATEGORIA_FK"
                  value={selecionada.ID_CATEGORIA_FK}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {categorias.map(cat => (
                    <option key={cat.ID} value={cat.ID}>
                      {cat.NOME}
                    </option>
                  ))}
                </select>

                <div className="linha-dupla">
                  <div className="campo valor-campo">
                    <label>Valor da parcela</label>
                    <NumericFormat
                      value={selecionada.VALOR}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      onValueChange={(values) =>
                        setSelecionada((prev) => ({
                          ...prev,
                          VALOR: values.floatValue || 0,
                        }))
                      }
                    />
                  </div>

                  <div className="campo data-campo">
                    <label>Data</label>
                    <input
                      type="date"
                      name="DATA"
                      value={selecionada.DATA}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="campo parcela-campo">
                    <label>Parcela</label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      step={1}
                      value={selecionada.PARCELA}
                      onChange={(e) => setSelecionada({...selecionada, PARCELA: Number(e.target.value) || 1})}
                    />
                  </div>
                </div>

                <label>Descrição</label>
                <textarea
                  name="DESCRICAO"
                  value={selecionada.DESCRICAO}
                  onChange={handleChange}
                  rows={3}
                />

                <div className="botoes">
                  {selecionada.ID && (
                    <Button
                      children="Excluir"
                      onClick={excluirTransacao.bind(null, selecionada.ID)}
                    />
                  )}
                  <Button children="Salvar" onClick={salvarTransacao} />
                </div>

                {pErro && <p className="mensagemErro">{pErro}</p>}
              </>
            ) : (
              <div className="nenhuma-selecionada-NovaTransacao">
                <Button children="Nova Transação" onClick={IncluirTransacao} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovaTransacao;
