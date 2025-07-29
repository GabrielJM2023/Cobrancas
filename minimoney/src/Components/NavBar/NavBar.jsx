import React from 'react';
import './NavBar.css'
import Teste from './favicon.ico';

function NavBar(){
  return (
    <div className='NavBar'>
        <div  className='Cabecalho'>
          <img src={Teste} className='logo'/>        
          <h1>Minimoney</h1>
        </div>
    </div>    
  );
}

export default NavBar;
