import React, { useState, useEffect } from "react";
import "./NovaTransacao.css";
import Button from "../../../Components/Button/button";
import { supabase } from "../../../lib/supabaseCliente";
import { NumericFormat } from 'react-number-format';

function NovaTransacao() {
  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [pErro, setMensagemErro] = useState("");

  useEffect(() => {
    CarregarCategorias();
    CarregarTransacao();
  }, []);
  
  /* =======================
     FORM
  ======================= */
  const IncluirTransacao = () => {
    setSelecionada({
      id: null,
      Tipo: "S",
      Valor: 0,
      Data: "",
      Descricao: "",
      FK_ID_Categoria: "",
    });
    setMensagemErro("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelecionada((prev) => {
      if (name === "Tipo") {
        return { ...prev, Tipo: value, FK_ID_Categoria: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const salvarTransacao = () => {
    if (!selecionada.Valor || selecionada.Valor <= 0) {
      setMensagemErro("Informe um valor válido");
      return;
    }

    if (!selecionada.FK_ID_Categoria) {
      setMensagemErro("Selecione uma categoria");
      return;
    }

    SalvarOuAtualizar(selecionada);
  };

  /* =======================
     DADOS
  ======================= */
  const CarregarCategorias = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario } = await supabase
      .from("Usuario")
      .select("id")
      .eq("FK_user_id", user.id)
      .single();

    const { data } = await supabase
      .from("Categoria")
      .select("id, Nome, Tipo")
      .eq("FK_ID_Usuario", usuario.id);

    setCategorias(data || []);
  };

  const SalvarOuAtualizar = async (transacao) => {
    const { id, Categoria, ...dados } = transacao;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario } = await supabase
      .from("Usuario")
      .select("id")
      .eq("FK_user_id", user.id)
      .single();

    if (id) {
      await supabase
        .from("Transacao")
        .update(dados)
        .eq("id", id);
    } else {
      await supabase
        .from("Transacao")
        .insert([{ ...dados, FK_ID_Usuario: usuario.id }]);
    }

    CarregarTransacao();
    setSelecionada(null);
    
    setMensagemErro(""); 
  };

  const excluirTransacao = async (id) => {
    await supabase.from("Transacao").delete().eq("id", id);
    CarregarTransacao();
    setMensagemErro(""); 
    setSelecionada(null);
  };

  const CarregarTransacao = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: usuario } = await supabase
      .from("Usuario")
      .select("id")
      .eq("FK_user_id", user.id)
      .single();

    const { data } = await supabase
      .from("Transacao")
      .select(`
        id,
        Tipo,
        Valor,
        Data,
        Descricao,
        FK_ID_Categoria,
        Categoria:FK_ID_Categoria ( Nome )
      `)
      .eq("FK_ID_Usuario", usuario.id);

    setTransacoes(data || []);
  };

  /* =======================
     DERIVADOS
  ======================= */
  const categoriasFiltradas = categorias.filter(
    (c) => c.Tipo === selecionada?.Tipo
  );

  /* =======================
     UI
  ======================= */
  return (
    <div className="Card-NovaTransacao">
      <div className="NT-card-central">
        <div className="NT-card-esquerda">
          <h2>Lista</h2>
          <div className="lista-NovaTransacao">
            {transacoes.map((t) => (
              <div
                key={t.id}
                className={`item-NovaTransacao ${
                  selecionada?.id === t.id ? "ativo" : ""
                }`}
                onClick={() => setSelecionada(t)}
              >
                <div className="item-grid">
                  <span className="descricao">{t.Descricao}</span>
                  <span className="categoria">{t.Categoria.Nome}</span>
                  <span className="data">{t.Data}</span>
                  <span className={`tipo ${t.Tipo === "S" ? "gasto" : "receita"}`}>
                    {t.Tipo === "S" ? "Gasto" : "Receita"}
                  </span>
                  <span className="valor">R$ {t.Valor.toFixed(2)}</span>
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
              <select name="Tipo" value={selecionada.Tipo} onChange={handleChange}>
                <option value="S">Gasto</option>
                <option value="E">Receita</option>
              </select>

              <label>Categoria</label>
              <select
                name="FK_ID_Categoria"
                value={selecionada.FK_ID_Categoria}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {categoriasFiltradas.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.Nome}
                  </option>
                ))}
              </select>

              <div className="linha-dupla">
                <div className="campo">
                  <label>Valor</label>
                  <NumericFormat
                    value={selecionada.Valor}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    onValueChange={(values) => {
                      setSelecionada((prev) => ({
                        ...prev,
                        Valor: values.floatValue || 0,
                      }));
                    }}
                  />
                </div>

                <div className="campo">
                  <label>Data</label>
                  <input
                    type="date"
                    name="Data"
                    value={selecionada.Data}
                    onChange={handleChange}
                  />
                </div>
              </div>


              <label>Descrição</label>
              <textarea
                name="Descricao"
                value={selecionada.Descricao}
                onChange={handleChange}
                rows={3}
              />

              <div className="botoes">
                {selecionada.id && (
                  <Button
                    children="Excluir"
                    onClick={() => excluirTransacao(selecionada.id)}
                  />
                )}
                <Button children="Salvar" onClick={salvarTransacao} />
              </div>

              {pErro && <p className="mensagemErro">{pErro}</p>}
            </>
          ) : (
            <div className="nenhuma-selecionada-NovaTransacao">
              <p>Selecione uma transação</p>
              <Button children="Nova Transação" onClick={IncluirTransacao} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default NovaTransacao;
