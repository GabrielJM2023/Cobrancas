import React from 'react';
import logo from '../../logo.svg';
import './style.css';

import Button from '../../Components/Button/button';

import ImgStart from '../../ImgStart.svg';
import Logo from '../../logo192.png';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { supabase } from '../../lib/supabaseCliente';

function Start() {
  const navigate = useNavigate();
   
  const Cadastro =()=>{
    navigate('/Cadastro');
  };

  const Entrar=()=>{
    navigate('/Login');
  }  

  const [session, setSession] = useState()
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
      //trocar false por "session" para ver se está logado
      if (false) {
        navigate('/Home')
      }
  }, [session]); 

  return (
    <div className="card-central">
      <div className="card-esquerda">
        <img src={ImgStart} alt='Start' className='ImgStart'/>
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
          <Button children={'Entrar'} onClick={Entrar}></Button>          
        </div>
      </div>
    </div>
  );
}

export default Start;
