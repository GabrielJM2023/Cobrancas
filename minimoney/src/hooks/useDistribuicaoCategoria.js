import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useDistribuicaoCategoria(filtros) {
  const [resumo, setResumo] = useState([]);
  const userID = useUserId();

  useEffect(() => {
    const carregar = async () => {
    try{   
        if (!userID) {
          console.error("Usuário não autenticado.");
          return;
        }

        const { data, error } = await supabase
          .rpc('distribuicao_categoria', {
            p_data_fim: filtros.dataFim,
            p_data_inicio: filtros.dataInicio,
            p_usuario: userID           
          });

        if (error) {
          console.error("Erro ao carregar distribuicao categoria:", error);
          setResumo(null);
        } else {
          const dataComCores = (data || []).map(item => ({
            ...item,
            cor: gerarCorAleatoriaUnica()
          }));
          setResumo(dataComCores);
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar distribuicao categoria:", err);
      }
    };

    carregar();
  }, [filtros.dataInicio, filtros.dataFim, filtros.periodo, userID]);

  return resumo;
}

const coresGeradas = new Set();

function gerarCorAleatoriaUnica() {
  let cor;
  let tentativas = 0;

  do {
    cor = gerarCorViva();
    tentativas++;
    if (tentativas > 100) {
      cor = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
      break;
    }
  } while (coresGeradas.has(cor));

  coresGeradas.add(cor);
  return cor;
}

function gerarCorViva() {
  const r = Math.floor(Math.random() * 156) + 100; // 100-255
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r},${g},${b})`;
}
