import React from 'react';
import './NavBar.css'
import Teste from './favicon.ico';

import { VscGraph } from "react-icons/vsc";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { FaDoorOpen, FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseCliente';
import  LightDark from '../../Components/LightDark/LitghtDark';
import { useState } from "react";

function NavBar(){
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const Home = () => {
    navigate("/home/DashBoard");
    setMenuAberto(false);
  }
  
  const Categorias = () => {
    navigate("/home/categorias");
    setMenuAberto(false);
  }

  const NovaTransacao = () => {
    navigate("/home/novatransacao");
    setMenuAberto(false);
  }

  const Sair = async () =>{
    const { error } = await supabase.auth.signOut()
    if (!error) {
      console.log("Usuário deslogado com sucesso");
    } else {
      console.error("Erro ao deslogar usuário:", error.message);
    }

    navigate("/");
  }

  return (
    <>
      <button
        className={`menu-mobile ${menuAberto ? "fechado" : ""}`}
        onClick={() => setMenuAberto(true)}
      >
        <FaBars />
      </button>

      {menuAberto && (
        <div
          className="overlay"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <div className={`NavBar ${menuAberto ? "aberta" : ""}`}>
        <div className="CabecalhoNavBar">
          <div className="Cabecalho">
            <img src={Teste} className="logo" alt="Logo" />

            <div className="central">
              <h1>Minimoney</h1>
            </div>
          </div>
        </div>

        <hr />

        <div className="menus">
          <div className="menu" onClick={Home}>
            <VscGraph className="icone" />
            <h1>Dashboard</h1>
          </div>

          <div className="menu" onClick={NovaTransacao}>
            <FaMoneyBillTransfer className="icone" />
            <h1>Transação</h1>
          </div>

          <div className="menu" onClick={Categorias}>
            <CiBoxList className="icone" />
            <h1>Categorias</h1>
          </div>

          <div className="menu menu-LightDark">
            <LightDark />
          </div>

          <div className="menu menu-sair" onClick={Sair}>
            <FaDoorOpen className="icone" />
            <h1>Sair</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
