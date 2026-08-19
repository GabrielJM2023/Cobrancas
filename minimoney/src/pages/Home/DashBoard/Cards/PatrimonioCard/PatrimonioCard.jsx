import "./PatrimonioCard.css";
import Card from '../../../../../Components/Card/Card'
import { usePatrimonioTotal } from './usePatrimonioTotal';
import { useValores } from '../../../../../context/ValoresContext';

function PatrimonioCard() {   
  const patrimonio = usePatrimonioTotal();
  const { valoresVisiveis } = useValores();

  return (
    <Card className="custom-card PatrimonioCard">
      <div>
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
      </div>      
    </Card>
  );
}

export default PatrimonioCard;
