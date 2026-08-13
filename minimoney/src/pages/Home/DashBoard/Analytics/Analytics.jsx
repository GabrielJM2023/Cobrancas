import "./Analytics.css";
import Fluxocaixa from '../Cards/FluxoCaixa/FluxoCaixa';
import GastoCategoria from '../Cards/GastoCategoria/GastoCategoria';
import MinhaConta from '../Cards/MinhaConta/MinhaConta';

function Analytics() {  
  return (
    <div className="Analytics">
      <Fluxocaixa />
      <GastoCategoria />
      <MinhaConta />
    </div>   
  );
}

export default Analytics;
