const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatarData = (data) => {
  if (!data) return "-";

  const [ano, mes, dia] = String(data).split("-");
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : "-";
};

const obterTipoTexto = (tipo) => {
  switch (tipo) {
    case "E":
      return "Entrada";
    case "S":
      return "Saída";
    case "T":
      return "Transferência";
    default:
      return "Desconhecido";
  }
};

const obterContaDaTransacao = (transacao) => {
  if (transacao.TIPO === "E") return transacao.CONTA_DESTINO?.NOME || "-";
  return transacao.CONTA_ORIGEM?.NOME || "-";
};

export function gerarRelatorioTransacoes({
  transacoes = [],
  filtros,
  categoriaSelecionada,
  contaSelecionada,
}) {
  const totais = transacoes.reduce(
    (acumulado, transacao) => {
      const valor = Number(transacao.VALOR || 0);

      if (transacao.TIPO === "E") acumulado.entradas += valor;
      if (transacao.TIPO === "S") acumulado.saidas += valor;
      if (transacao.TIPO === "T") acumulado.transferencias += valor;

      return acumulado;
    },
    { entradas: 0, saidas: 0, transferencias: 0 }
  );

  const resumoCategorias = Object.entries(
    transacoes.reduce((categorias, transacao) => {
      if (transacao.TIPO !== "S") return categorias;

      const nomeCategoria = transacao.CATEGORIA?.NOME || "Sem categoria";
      categorias[nomeCategoria] =
        (categorias[nomeCategoria] || 0) + Number(transacao.VALOR || 0);

      return categorias;
    }, {})
  )
    .sort(([, valorA], [, valorB]) => valorB - valorA)
    .map(([categoria, valor]) => `${categoria}: ${formatarMoeda(valor)}`);

  const linhas = transacoes.map((transacao) => {
    const texto = [
      `Data: ${formatarData(transacao.DATA)}`,
      `Descrição: ${transacao.DESCRICAO || "-"}`,
      `Tipo: ${obterTipoTexto(transacao.TIPO)}`,
    ];

    if (transacao.TIPO === "T") {
      texto.push(
        "Categoria: Não se aplica",
        `Conta origem: ${transacao.CONTA_ORIGEM?.NOME || "-"}`,
        `Conta destino: ${transacao.CONTA_DESTINO?.NOME || "-"}`
      );
    } else {
      texto.push(
        `Categoria: ${transacao.CATEGORIA?.NOME || "-"}`,
        `Conta: ${obterContaDaTransacao(transacao)}`
      );
    }

    texto.push(`Valor: ${formatarMoeda(transacao.VALOR)}`);

    if (transacao.PARCELA && Number(transacao.PARCELA) > 1) {
      texto.push(`Parcela: ${transacao.PARCELA}`);
    }

    return texto.join("\n");
  });

  return `RELATÓRIO FINANCEIRO — MINIMONEY

PERÍODO
${formatarData(filtros?.dataInicio)} a ${formatarData(filtros?.dataFim)}

GERADO EM
${new Date().toLocaleDateString("pt-BR")}

FILTROS APLICADOS
Conta: ${contaSelecionada || "Todas"}
Tipo: ${filtros?.tipo ? obterTipoTexto(filtros.tipo) : "Todos"}
Categoria: ${categoriaSelecionada || "Todas"}

RESUMO FINANCEIRO
Total de entradas: ${formatarMoeda(totais.entradas)}
Total de saídas: ${formatarMoeda(totais.saidas)}
Resultado financeiro: ${formatarMoeda(totais.entradas - totais.saidas)}
Total de transferências: ${formatarMoeda(totais.transferencias)}
Quantidade de transações: ${transacoes.length}

RESUMO POR CATEGORIA
${resumoCategorias.length ? resumoCategorias.join("\n") : "Nenhuma saída encontrada para os filtros aplicados."}

MOVIMENTAÇÕES

${linhas.length ? linhas.join("\n\n") : "Nenhuma transação encontrada para os filtros aplicados."}

FIM DO RELATÓRIO`;
}
