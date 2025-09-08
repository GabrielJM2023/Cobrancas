import React from 'react';
import './NavBar.css'
import Teste from './favicon.ico';

import { VscGraph } from "react-icons/vsc";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { FaDoorOpen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function NavBar(){
  const navigate = useNavigate();

  const Home = () => {
    navigate("/home");
  }
  
  const Categorias = () => {
    navigate("/home/categorias");
  }

  const NovaTransacao = () => {
    navigate("/home/novatransacao");
  }

  const Sair = () =>{
    supabase.auth.signOut()
    navigate("/");
  }

  return (
    <div className='NavBar'>
      <div className='CabecalhoNavBar'>
        <div className='Cabecalho'>
          <img src={Teste} className='logo'/>        
          <div className='central'>
            <h1>Minimoney</h1>
          </div>          
        </div>
      </div>
        <hr/>
        <div className='menus'>
          <div className='menu'  onClick={Home} >
            <VscGraph className='icone'/>
            <h1>Dashboard</h1>
          </div>
          <div className='menu'>
            <GrTransaction  className='icone' />
            <h1>Transação</h1>
          </div>
          <div className='menu' onClick={NovaTransacao}>
            <FaMoneyBillTransfer  className='icone' />
            <h1>Nova Transação</h1>
          </div>
          <div className='menu' onClick={Categorias}>
            <CiBoxList  className='icone' />
            <h1>Categorias</h1>
          </div>
          <div className='menu menu-sair' onClick={Sair}>
            <FaDoorOpen  className='icone' />
            <h1>Sair</h1>
          </div>
        </div>
    </div>    
  );
}

export default NavBar;
