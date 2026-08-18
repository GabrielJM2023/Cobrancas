import "./DashBoard.css";
import Hero from './Hero/Hero';
import PatrimonioCard from './Cards/PatrimonioCard/PatrimonioCard';
import Analytics from './Analytics/Analytics';

import { IoEye, IoEyeOff } from "react-icons/io5";
import { useValores } from "../../../context/ValoresContext";

function Dashboard() {  
  const { valoresVisiveis, alternarValores } = useValores();

  return (
    <div className="Dashboard">
      <div className="Dashboard-main">
        <div className="Dashboard-header">
          <div className="header-title">
              <h1>Bom dia, Gabriel! 👋</h1>               
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
