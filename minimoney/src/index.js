import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Start from './pages/Start/page'
import Cadastro from './pages/Cadastro/page';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Start/>} />                
        <Route path='/Cadastro' element={<Cadastro/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

