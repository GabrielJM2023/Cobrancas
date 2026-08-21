import "./DashBoard.css";
import Hero from './Hero/Hero';
import PatrimonioCard from './Cards/PatrimonioCard/PatrimonioCard';
import Analytics from './Analytics/Analytics';

import { IoEye, IoEyeOff } from "react-icons/io5";
import { useValores } from "../../../context/ValoresContext";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseCliente";
 

function Dashboard() {  
  const { valoresVisiveis, alternarValores } = useValores();
  const [nome, setNome] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) return;

      const { data, error: usuarioError } = await supabase
        .from("USUARIO")
        .select("NOME")
        .eq("ID_AUTH_FK", user.id)
        .single();

      if (usuarioError || !data) return;

      setNome(data.NOME);
    };

    carregarUsuario();
  }, []);

  return (
    <div className="Dashboard">
      <div className="Dashboard-main">
        <div className="Dashboard-header">
          <div className="header-title">
              <h1>Bom dia, {nome}! 👋</h1>               
              <p>Aqui está o resumo da sua vida financeira.</p>
          </div>
          
          <PatrimonioCard/>
        </div>
        <button onClick={alternarValores} className="toggle-valores-button">
          {valoresVisiveis ? <IoEye /> : <IoEyeOff />}
        </button>
        
        <Hero/>                    
        <Analytics/>
      </div>
    </div>      
  );
}

export default Dashboard;
