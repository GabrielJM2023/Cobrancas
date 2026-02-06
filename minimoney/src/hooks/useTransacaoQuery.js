import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useTransacaoQuery(filtros) {
  const [transacoes, setTransacao] = useState([]);
  const userId = useUserId();
  const filtrosMemo = useMemo(() => ({
    dataInicio: filtros.dataInicio,
    dataFim: filtros.dataFim,
    tipo: filtros.tipo,
    categoria: filtros.categoria
  }), [filtros.dataInicio, filtros.dataFim, filtros.tipo, filtros.categoria]);

  const carregar = async (filtros) => {
      if (!userId) return;
  
      let query = supabase
        .from("TRANSACAO")
        .select(`
          ID,
          TIPO,
          VALOR,
          DATA,
          DESCRICAO,
          PARCELA,
          ID_CATEGORIA_FK,
          CATEGORIA:ID_CATEGORIA_FK ( NOME )
        `)
      .eq("ID_USUARIO_FK", userId)
      .order("DATA", { ascending: false });
    
      if (filtros.tipo) {
        query = query.eq("TIPO", filtros.tipo);
      }
    
      if (filtros.categoria) {
        query = query.eq("ID_CATEGORIA_FK", filtros.categoria);
      }
    
      if (filtros.dataInicio) {
        query = query.gte("DATA", filtros.dataInicio);
      }
    
      if (filtros.dataFim) {
        query = query.lte("DATA", filtros.dataFim);
      }
    
      const { data, error } = await query;
    
      if (!error) setTransacao(data ?? []);
    }

  useEffect(() => {    
    carregar(filtrosMemo);
  }, [filtrosMemo]);   

    return { transacoes, carregar };
}    