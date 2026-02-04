import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

export function useDistribuicaoCategoria(filtros) {
  const [resumo, setResumo] = useState([]);

  useEffect(() => {
    const carregar = async () => {
    try{
      const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Erro ao obter usuário:", userError);
          return;
        }
        const { data: usuario } = await supabase
          .from("USUARIO")
          .select("ID")
          .eq("USER_ID_FK", user.id)
          .single();

        const { data, error } = await supabase
          .rpc('distribuicao_categoria', {
            p_data_fim: filtros.dataFim,
            p_data_inicio: filtros.dataInicio,
            p_usuario: usuario.ID           
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
          console.log("Distribuicao categoria :", dataComCores);
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar distribuicao categoria:", err);
      }
    };

    carregar();
  }, [filtros.dataInicio, filtros.dataFim, filtros.periodo]);

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
      // fallback caso não consiga gerar cor única
      cor = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
      break;
    }
  } while (coresGeradas.has(cor));

  coresGeradas.add(cor);
  return cor;
}

// Gera uma cor viva, evitando tons muito claros ou muito escuros
function gerarCorViva() {
  const r = Math.floor(Math.random() * 156) + 100; // 100-255
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r},${g},${b})`;
}

// Reset caso queira gerar novo conjunto
function resetCores() {
  coresGeradas.clear();
}