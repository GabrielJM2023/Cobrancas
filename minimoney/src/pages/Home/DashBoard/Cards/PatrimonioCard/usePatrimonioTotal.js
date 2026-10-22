import { useEffect, useState } from "react";
import { supabase } from '../../../../../lib/supabaseCliente';

export function usePatrimonioTotal({ pUserId }) {
  const [patrimonio, setPatrimonio] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log("usePatrimonioTotal pUserId:", pUserId);
    setCarregando(true);
    if (!pUserId) {
      console.error("ID do usuário não encontrado.");
      setPatrimonio(null);
      setCarregando(false);
      return;
    }

    const carregar = async () => {      
      try{        
        const { data } = await supabase
          .from("vw_patrimonio")
          .select("*")
          .eq("ID_USUARIO_FK", pUserId)
          .single();

        if (!data) {
          setPatrimonio([]);
        } else {
          setPatrimonio(data);
        }  
      } catch (error) {
        setPatrimonio(null);
      }
      finally {
        setCarregando(false);
      }     
    };

    carregar();    
  }, [pUserId]);

  return { patrimonio, carregando };
}
