import React, { useState } from "react";
import Button from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

import './Login.css'

import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { useLogin } from "../../hooks/signInWithPassword";

function Logar(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { Login, loading, error, setError } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Login(email, senha);
    }

    const Voltar =()=> {
        setError(null);
        navigate('/');
    }

    return(
      <form onSubmit={handleSubmit}>
        <div className="card-Login">
            <div className="card-Central login">
            <div className="Logar">
                <h1>Login</h1>                
            </div>
            <div className="input-group login">
                <label>Email</label>
                <MdOutlineEmail className="icon"/>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div className="input-group login">
              <label>Senha</label>                    
              <FaLock className="icon"/>
              <input 
                type="password" 
                placeholder="Senha" 
                value={senha} 
                onChange={e=>setSenha(e.target.value)}
              />
              </div>
              <div className="mensagemErro">
                {error && <p>{error}</p>}
              </div>
              <div className='card-Button login'>
                <Button onClick={Voltar}>Voltar</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </div>            
        </div>
      </form>
    )
}

export default Logar;
