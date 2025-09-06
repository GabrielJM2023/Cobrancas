import React from 'react';

import './Cadastro.css';

import Button from '../../Components/Button/button';

import { useNavigate } from 'react-router-dom';

import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { supabase } from '../../lib/supabaseCliente';
import { useState } from 'react';

function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setMensagemErro] = useState('');

    const Voltar = () => {
        navigate('/');
    }

    const CadastroUsuario = async({nome, email, senha}) => {
        try{
            const{data, error} = await supabase.auth.signUp({
                email: email,
                password: senha,
                options: {
                    data: {
                        nome: nome,
                    }
                }
            })
            if(error){
                console.error('Erro ao criar usuário', error.message);
                setMensagemErro(error.message);
                return
            } else {
                navigate('/confirmarEmail');
            }
        }catch (e){
            console.error('Erro ao criar usuário', e.message);
            setMensagemErro(e.message);
            return        
        }
    }

    return (
        <div className="card-Cadastro">
            <div className="card-Central">
                <div className='Cadastrar'>
                <h1>Cadastrar</h1>
                </div>
                <div className="input-group">
                    <label>Nome</label>
                    <IoPersonCircleOutline className="icon"/>
                    <input type="text" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}/>
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <MdOutlineEmail className="icon"/>
                    <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className="input-group">
                    <label>Senha</label>
                    <FaLock className="icon"/>
                    <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)}/>
                </div>
                <div>
                    <p>{erro}</p>
                </div>

                <div className='card-Button'>
                    <Button children={'Voltar'} onClick={Voltar}></Button>
                    <Button children={'Cadastrar'} onClick={()=> CadastroUsuario({nome,email,senha})}></Button>                    
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
