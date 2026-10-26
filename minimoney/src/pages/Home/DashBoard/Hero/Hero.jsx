import "./Hero.css";
//import GraficoPatrimonio from '../Cards/GraficoPatrimonio/GraficoAnualPatrimonio';
import GraficoCategoria from '../Cards/GraficoAnualCategoria/GraficoAnualCategoria';
import ResumoMes from '../Cards/ResumoMes/ResumoMes';

function Hero({ pUserId }) {  
  return (
    <div className="Hero">
      <GraficoCategoria pUserId={pUserId} />
      <ResumoMes pUserId={pUserId} />
    </div>   
  );
}

export default Hero;
