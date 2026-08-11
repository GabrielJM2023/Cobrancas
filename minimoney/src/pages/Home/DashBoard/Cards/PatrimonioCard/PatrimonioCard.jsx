import "./PatrimonioCard.css";
import Card from '../../../../../Components/Card/Card'
import { usePatrimonioTotal } from './usePatrimonioTotal';

function PatrimonioCard() {   
  const patrimonio = usePatrimonioTotal();

  return (
    <Card className="custom-card PatrimonioCard">
      <div>
        <p>
            {Number(patrimonio?.patrimonio ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}
        </p>
      </div>      
    </Card>
  );
}

export default PatrimonioCard;
