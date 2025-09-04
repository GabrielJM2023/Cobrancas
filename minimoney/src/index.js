import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Start from './pages/Start/page'
import Cadastro from './pages/Cadastro/page';
import Login from './pages/Login/page';
import Home from './pages/Home/page';
import Categorias from './pages/Home/Categorias/page';
import NovaTransacao from './pages/Home/NovaTransacao/page';
import ConfirmarEmail from './pages/ConfirmarEmail/page';
import SemConexao from './pages/SemConexao/page';
import MonitorConexao from './lib/monitorConexao';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <MonitorConexao/>      
      <Routes>
        <Route path="/" element={<Start/>} />                
        <Route path='/Cadastro' element={<Cadastro/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path="/home" element={<Home />}>
          <Route path='/home/categorias' element={<Categorias />} />
          <Route path='/home/novatransacao' element={<NovaTransacao />} />
          {/* outras páginas que precisam da navbar */}
          {/* ex: /home/transacoes */}
        </Route>
        <Route path='/sem-conexao' element={<SemConexao/>}/>
        <Route path='/confirmarEmail' element={<ConfirmarEmail/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

