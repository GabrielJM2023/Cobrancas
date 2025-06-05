import React from 'react';
import logo from '../../logo.svg';
import './style.css';

import Button from '../../Components/Button/button';

import ImgStart from '../../ImgStart.svg';
import Logo from '../../logo192.png';

import { useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate();

  const Cadastro =()=>{
    navigate('/Cadastro');
  };
  return (
    <div className="card-central">
      <div className="card-esquerda">
        <img src={ImgStart} alt='Start'/>
      </div>
      <div className="card-direita">
        <div className='card-logo'>
          <img src={Logo} className='logo'/>
        </div>
        <h1>Bem-vindo ao Minimoney!</h1>
        <p>Com o Minimoney, você acompanha seus gastos, organiza suas entradas e 
          saídas, visualiza gráficos simples e toma decisões mais conscientes 
          sobre seu dinheiro.</p>
        <p>Seja para economizar, investir ou simplesmente entender melhor suas finanças,
          aqui você tem tudo o que precisa em um só lugar, de forma prática e rápida.</p>
        
        <div className='card-botao'>
          <Button children={'Cadastrar'} onClick={Cadastro}></Button>
          <Button children={'Entrar'}></Button>          
        </div>
      </div>
    </div>
  );
}

export default Start;
