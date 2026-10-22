import "./Analytics.css";
import Fluxocaixa from '../Cards/FluxoCaixa/FluxoCaixa';
import GastoCategoria from '../Cards/GastoCategoria/GastoCategoria';
import MinhaConta from '../Cards/MinhaConta/MinhaConta';

function Analytics({ pUserId }) {  
  return (
    <div className="Analytics">
      <Fluxocaixa pUserId={pUserId} />
      <GastoCategoria pUserId={pUserId} />
      <MinhaConta pUserId={pUserId} />
    </div>   
  );
}

export default Analytics;
