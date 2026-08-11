import "./Hero.css";
import GraficoPatrimonio from '../Cards/GraficoPatrimonio/GraficoAnualPatrimonio';
import ResumoMes from '../Cards/ResumoMes/ResumoMes';

function Hero() {  
  return (
    <div className="Hero">
      <GraficoPatrimonio />
      <ResumoMes />
    </div>   
  );
}

export default Hero;
