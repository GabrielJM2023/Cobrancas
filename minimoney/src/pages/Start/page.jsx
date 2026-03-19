import './Start.css';
import Button from '../../Components/Button/button';
import ImgStart from '../../ImgStart.svg';
import Logo from '../../logo192.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseCliente';
import  LightDark from '../../Components/LightDark/LitghtDark';


function Start() { 
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  const Cadastro =()=>{
    navigate('/Cadastro');
  };

  const Entrar=()=>{
    navigate('/Login');
  }  
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])
  
  useEffect(() => {
    if (session) {
      navigate('/Home/Dashboard');
    }
  }, [session, navigate]); 

  return (
    <div className='Start'>
      <div className="Start-card-central">
        <div className="Start-card-esquerda">
          <img src={ImgStart} alt='Start' className='Start-ImgStart'/>
        </div>
        <div className="Start-card-direita">
          <div className='Start-card-logo'>
            <img src={Logo} className='Start-Logo' alt='Foto da direita'/>
            <h1>Bem-vindo ao Minimoney!</h1>
          </div>
          <div className='Start-card-texto'>
            <p>Transforme o controle das suas finanças em algo simples e poderoso. Com o Minimoney, 
              acompanhe cada gasto, organize receitas e despesas, visualize relatórios claros e 
              tome decisões inteligentes sobre seu dinheiro — tudo em um só lugar.
            </p>
            <img src={ImgStart} alt='Start' className='Start-ImgStart-direita'/>
            <p className='Start-texto-p'>Seja para economizar mais, investir com confiança ou entender melhor seus hábitos 
              financeiros, nossa plataforma intuitiva e rápida está aqui para ajudar você a
              alcançar seus objetivos. Comece agora e veja a diferença!
            </p>
          </div>
          <LightDark></LightDark>
          
          <div className='Start-card-botao'>
            <Button children={'Cadastro'} onClick={Cadastro}></Button>
            <Button children={'Login'} onClick={Entrar}></Button>          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;