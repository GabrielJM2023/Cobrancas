import React from "react";
import Button from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

import './Login.css'

import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { useState } from "react";

import { supabase } from "../../lib/supabaseCliente";

function Logar(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setMensagemErro] = useState('');

    const Voltar =()=>{
        navigate('/');
    }

    const Login = async({email, senha}) =>{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });
            
        const user = data.user;   
        
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error("Erro ao buscar usuário:", userError.message);
            return;
        } else {
            navigate('/Home');
        }        
    }

    return(
        <div className="card-Login">
            <div className="card-Central">
                <h1>Login</h1>                
                <div className="input-group login">
                    <label>Email</label>
                    <MdOutlineEmail className="icon"/>
                    <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className="input-group login">
                    <label>Senha</label>                    
                    <FaLock className="icon"/>
                    <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)}/>
                </div>
                <div>
                    <p>{erro}</p>
                </div>
                <div className='card-Button login'>
                    <Button children={'Voltar'} onClick={Voltar}></Button>
                    <Button children={'Entrar'} onClick={()=>Login({email,senha})}></Button>
                </div>
            </div>            
        </div>
    )

}

export default Logar;