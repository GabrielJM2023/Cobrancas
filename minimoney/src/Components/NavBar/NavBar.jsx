import React from 'react';
import './NavBar.css'
import Teste from './favicon.ico';

import { VscGraph } from "react-icons/vsc";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { FaDoorOpen } from "react-icons/fa";


function NavBar(){
  return (
    <div className='NavBar'>
        <div  className='Cabecalho'>
          <img src={Teste} className='logo'/>        
          <div className='central'>
            <h1>Minimoney</h1>
          </div>          
        </div>
        <hr/>

        <div className='menu'>
          <VscGraph className='icone' />
          <h1>Dashboard</h1>
        </div>

        <div className='menu'>
          <GrTransaction  className='icone' />
          <h1>Transação</h1>
        </div>

        <div className='menu'>
          <FaMoneyBillTransfer  className='icone' />
          <h1>Nova Transação</h1>
        </div>

        <div className='menu'>
          <CiBoxList  className='icone' />
          <h1>Categorias</h1>
        </div>

        <div className='menu'>
          <FaDoorOpen  className='icone' />
          <h1>Sair</h1>
        </div>
    </div>    
  );
}

export default NavBar;
