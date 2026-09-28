import { useEffect, useState } from "react";
import { FaRegCopy, FaXmark } from "react-icons/fa6";
import Button from "../Button/button";
import "./ModalRelatorioTransacoes.css";

function ModalRelatorioTransacoes({ aberto, onFechar, relatorio }) {
  const [mensagemCopia, setMensagemCopia] = useState("");

  useEffect(() => {
    if (!aberto) return undefined;

    const fecharComEscape = (evento) => {
      if (evento.key === "Escape") onFechar();
    };

    window.addEventListener("keydown", fecharComEscape);
    return () => window.removeEventListener("keydown", fecharComEscape);
  }, [aberto, onFechar]);

  useEffect(() => {
    if (!aberto) setMensagemCopia("");
  }, [aberto]);

  if (!aberto) return null;

  const copiarRelatorio = async () => {
    try {
      await navigator.clipboard.writeText(relatorio);
      setMensagemCopia("Relatório copiado para a área de transferência.");
    } catch {
      setMensagemCopia("Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.");
    }
  };

  return (
    <div className="relatorio-modal-overlay" onMouseDown={onFechar}>
      <section
        className="relatorio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-relatorio"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <header className="relatorio-modal-cabecalho">
          <div>
            <h2 id="titulo-modal-relatorio">Relatório de transações</h2>
            <p>Pré-visualização do texto que será copiado.</p>
          </div>
          <button
            type="button"
            className="relatorio-modal-fechar"
            onClick={onFechar}
            aria-label="Fechar relatório"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </header>

        <textarea
          className="relatorio-modal-texto"
          value={relatorio}
          readOnly
          aria-label="Conteúdo do relatório"
        />

        <footer className="relatorio-modal-acoes">
          <span className="relatorio-modal-feedback" role="status" aria-live="polite">
            {mensagemCopia}
          </span>
          <Button onClick={copiarRelatorio} className="btn-copiar-relatorio">
            <FaRegCopy aria-hidden="true" /> Copiar relatório
          </Button>
        </footer>
      </section>
    </div>
  );
}

export default ModalRelatorioTransacoes;
