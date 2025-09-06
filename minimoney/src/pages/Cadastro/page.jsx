import React, { useState } from 'react';
import './Cadastro.css';

import Button from '../../Components/Button/button';
import { useNavigate } from 'react-router-dom';

import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { supabase } from '../../lib/supabaseCliente';

function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setMensagemErro] = useState('');

    const Voltar = () => {
        navigate('/');
    }

    const ValidaCampos = () => { 
    if (!nome || !email || !senha) {
        if (!nome) return "Por favor, preencha o nome";
        if (!email) return "Por favor, preencha o email";
        if (!senha) return "Por favor, preencha a senha";
    }

    // Nome muito curto
    if (nome.trim().length < 3) {
        return "O nome deve ter pelo menos 3 caracteres";
    }

    // Email inválido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Digite um email válido";
    }

    // Senha fraca
    if (senha.length < 6) {
        return "A senha deve ter pelo menos 6 caracteres";
    }
    if (!/[0-9]/.test(senha) || !/[A-Za-z]/.test(senha)) {
        return "A senha deve conter letras e números";
    }

    return null; // tudo certo
}

const CadastroUsuario = async () => {
    const erroValidacao = ValidaCampos();
    if (erroValidacao) {
        setMensagemErro(erroValidacao);
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: {
                data: { nome }
            }
        });

        if (error) {
            console.error('Erro ao criar usuário', error.message);

            // Tratamento de erros mais específicos
            if (error.message.includes("already registered")) {
                setMensagemErro("Este email já está cadastrado");
            } else if (error.message.includes("rate limit")) {
                setMensagemErro("Muitas tentativas, aguarde um pouco");
            } else {
                setMensagemErro("Erro ao cadastrar: " + error.message);
            }

            return;
        }

        navigate('/confirmarEmail');

        } catch (e) {
            console.error('Erro inesperado', e.message);
            setMensagemErro("Erro inesperado, tente novamente mais tarde");
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
                <div className='mensagemErro'>
                    <p>{erro || ''}</p>
                </div>

                <div className='card-Button'>
                    <Button onClick={Voltar}>Voltar</Button>
                    <Button onClick={CadastroUsuario}>Cadastrar</Button>                    
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
