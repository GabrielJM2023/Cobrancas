import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Start from './pages/Start/page';
import Cadastro from './pages/Cadastro/page';
import Login from './pages/Login/page';
import Home from './pages/Home/page';
import Categorias from './pages/Home/Categorias/page';
import NovaTransacao from './pages/Home/NovaTransacao/page';
import ConfirmarEmail from './pages/ConfirmarEmail/page';
import SemConexao from './pages/SemConexao/page';
import Dashboard from './pages/Home/DashBoard/page';
import { PrivateRoute } from './Components/Private/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; // ⚠️ Provider correto

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Start/>} />                
          <Route path="/Cadastro" element={<Cadastro/>}/>
          <Route path="/Login" element={<Login/>}/>        

          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
            <Route path="categorias" element={<Categorias />} />
            <Route path="novatransacao" element={<NovaTransacao />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/sem-conexao" element={<SemConexao/>}/>
          <Route path="/confirmarEmail" element={<ConfirmarEmail/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
