import "./Hero.css";
import GraficoPatrimonio from '../Cards/GraficoPatrimonio/GraficoAnualPatrimonio';
import ResumoMes from '../Cards/ResumoMes/ResumoMes';

function Hero({ pUserId }) {  
  return (
    <div className="Hero">
      <GraficoPatrimonio pUserId={pUserId} />
      <ResumoMes pUserId={pUserId} />
    </div>   
  );
}

export default Hero;
