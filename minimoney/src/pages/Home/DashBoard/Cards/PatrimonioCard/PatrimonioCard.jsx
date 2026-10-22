import "./PatrimonioCard.css";
import Card from '../../../../../Components/Card/Card'
import { usePatrimonioTotal } from './usePatrimonioTotal';
import { useValores } from '../../../../../context/ValoresContext';
import { Riple } from "react-loading-indicators";

function PatrimonioCard({ pUserId }) {   
  const { patrimonio, carregando } = usePatrimonioTotal({ pUserId });
  const { valoresVisiveis } = useValores();

  return (
    <Card className="custom-card PatrimonioCard">
      <div>
        {carregando ? (
          <div className="carregando-NovaTransacao">
            <Riple color="#2f9e9e" size="small" />
          </div>
        ) :  (
          <p className="card-title">
            {valoresVisiveis ? (
            Number(patrimonio?.patrimonio ?? 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          ) : (
            "••••••••"
          )}
        </p>
        )}
      </div>      
    </Card>
  );
}

export default PatrimonioCard;
