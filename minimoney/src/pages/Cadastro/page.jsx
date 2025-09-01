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

    const Voltar = () => {
        navigate('/');
    }

    const CadastroUsuario = async({nome, email, senha}) => {
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
            return
        }

        const user = data.user;

        if(user){
            try {
                const categoriasPadrao = [
                    { nome: "Alimentação", tipo: "s" },
                    { nome: "Transporte", tipo: "s" },
                    { nome: "Saúde", tipo: "s" },
                    { nome: "Lazer", tipo: "s" },
                    { nome: "Salário", tipo: "e" },
                    { nome: "Investimentos", tipo: "e" },
                ];

                // Inserir categorias para esse usuário
                const { error: insertError } = await supabase
                    .from("Categoria")
                    .insert(categoriasPadrao.map((cat) => ({
                    nome: cat.nome,
                    tipo: cat.tipo,
                    user_id: user.id, // FK do usuário
                    })));

                if (insertError) {
                    console.error("Erro ao inserir categorias padrão", insertError.message);
                }
            } catch (e) {
                console.error("Erro inesperado:", e);
            }    

            navigate('/confirmarEmail');
        }
    }
    return (
        <div className="card-Cadastro">
            <div className="card-Central">
                <h1>Cadastrar</h1>
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

                <div className='card-Button'>
                    <Button children={'Voltar'} onClick={Voltar}></Button>
                    <Button children={'Cadastrar'} onClick={()=> CadastroUsuario({nome,email,senha})}></Button>                    
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
