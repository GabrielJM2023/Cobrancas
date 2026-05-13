import { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUserId } from "./useUserID";

export function useTransacaoQuery(filtros) {
  const [transacoes, setTransacao] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const userId = useUserId();
  const filtrosMemo = useMemo(() => ({
    dataInicio: filtros.dataInicio,
    dataFim: filtros.dataFim,
    tipo: filtros.tipo,
    categoria: filtros.categoria
  }), [filtros.dataInicio, filtros.dataFim, filtros.tipo, filtros.categoria]);

  const carregar = useCallback(async () => {
    setCarregando(true);
    if (!userId){
      setTransacao([]);
      return;
    } 
    
    try{
      

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
      
      if (filtrosMemo.tipo) {
        query = query.eq("TIPO", filtrosMemo.tipo);
      }
      
      if (filtrosMemo.categoria) {
        query = query.eq("ID_CATEGORIA_FK", filtrosMemo.categoria);
      }
      
      if (filtrosMemo.dataInicio) {
        query = query.gte("DATA", filtrosMemo.dataInicio);
      }
      
      if (filtrosMemo.dataFim) {
        query = query.lte("DATA", filtrosMemo.dataFim);
      }
      
      const { data, error } = await query;
      
      if (!error) setTransacao(data ?? []);
    } finally {
      setCarregando(false);
    }
  }, [userId, filtrosMemo]); 

  useEffect(() => {    
    carregar();
  }, [carregar]);

    return { transacoes, carregar, carregando };
}    