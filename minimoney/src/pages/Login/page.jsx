import React, { useState } from "react";
import Button from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

import './Login.css'

import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { supabase } from "../../lib/supabaseCliente";

function Logar(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setMensagemErro] = useState('');

    const Voltar =()=> {
        navigate('/');
    }

    const ValidaCamposLogin = (email, senha) => {
        if (!email) {
            return "Por favor, preencha o email.";
        }
        if (!senha) {
            return "Por favor, preencha a senha.";
        }
        return null; 
    }

    const Login = async({email, senha}) => {
        setMensagemErro('');

        const msgErro = ValidaCamposLogin(email, senha);
        if (msgErro) {
            setMensagemErro(msgErro);
            return;
        }

        try {    
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha,
            });
                        
            if (error) {

                console.error(error);                

                console.error("Erro ao logar:", error.message);
                if (error.message.includes("Invalid login credentials")) {
                    setMensagemErro("Email ou senha inválidos.");
                } else if (error.message.includes("Email not confirmed")) {
                    setMensagemErro("Confirme o email!");    
                }else{
                    setMensagemErro("Erro ao tentar logar. Tente novamente.");
                }
                return;
            } 

            if (!data.user) {
                setMensagemErro("Não foi possível encontrar este usuário.");
                return;
            }

            navigate('/Home');     
        } catch (e) {
            console.error("Erro inesperado:", e.message);
            setMensagemErro("Erro inesperado. Tente novamente mais tarde.");
        }
    }

    return(
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
                  {erro && <p>{erro}</p>}
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
