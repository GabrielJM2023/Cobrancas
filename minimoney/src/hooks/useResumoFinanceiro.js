import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";
import { useUsuario } from "./useUsuario";

export function useResumoFinanceiro(filtros) {
  const [resumo, setResumo] = useState(null);
  const { usuario } = useUsuario();

  useEffect(() => {
    if (!filtros || !filtros.dataInicio || !filtros.dataFim) return;
    if (!usuario) return; 

    const carregar = async () => {
      try {
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
              console.log("Usuario ID (categorias):", usuario.ID);
        console.log("Usuário autenticado:", usuario.ID);

        const { data, error } = await supabase
          .rpc("resumo_financeiro", {
            p_categoria: filtros.categoria || null,
            p_data_fim: filtros.dataFim,
            p_data_inicio: filtros.dataInicio,
            p_tipo: filtros.tipo || null,
            p_usuario: usuario.ID           
          });

        if (error) {
          console.error("Erro ao carregar resumo financeiro:", error);
          setResumo(null);
        } else {
          setResumo(data?.[0] || null);
          console.log("Resumo financeiro:", data);
        }
      } catch (err) {
        console.error("Erro inesperado ao carregar resumo financeiro:", err);
      }
    };

    carregar();
  }, [filtros.dataInicio, filtros.dataFim, filtros.tipo, filtros.categoria, filtros.periodo]);

  return resumo;
}
