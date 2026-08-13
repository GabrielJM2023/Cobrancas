import "./MinhaConta.css";
import Card from '../../../../../Components/Card/Card'
import { useMinhaConta } from './useMinhaConta';

function MinhaConta() {   
   const { dados } = useMinhaConta();    
    
  return (
    <Card className="custom-card">
        <div className="chart-header">
            <h3>Minhas Contas</h3>            
        </div>

        <div className="contas-body">
            <div className="contas-lista">
                {dados.map((item) => {
                    const patrimonio = Number(item.PATRIMONIO);
                    const negativo = patrimonio < 0;

                    return (
                        <div className="contas-item" key={item.ID_CONTA_FK}>

                            <div className="contas-header">
                                <span className="contas-nome">
                                    {item.CONTA}
                                </span>

                                <span
                                    className={`contas-valor ${
                                        negativo ? "negativo" : "positivo"
                                    }`}
                                >
                                    R$ {Math.abs(patrimonio).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2
                                    })}
                                </span>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    </Card>
  );
}

export default MinhaConta;