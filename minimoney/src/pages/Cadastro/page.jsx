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

        console.log('Usuário criado com sucesso:', data);

        if ("d217b870-9a86-4d1d-a5d8-928cae565389" !== user.id){
            console.error("ID de usuário inesperado:", user.id);
        }else{
            console.log("ID de usuário verificado:", user.id);
        }

        if(user){
            try {                
              const { data: usuarioData, error } = await supabase
                .from('Usuario')
                .insert([{
                    Nome: nome,
                    FK_user_id: user.id,
                }])
                .select();

                if (error) {
                    console.error("Erro ao inserir usuário:", error);
                    return;
                }

                const categoriasPadrao = [
                    { nome: "Alimentação", tipo: "S" },
                    { nome: "Transporte", tipo: "S" },
                    { nome: "Saúde", tipo: "S" },
                    { nome: "Lazer", tipo: "S" },
                    { nome: "Salário", tipo: "E" },
                    { nome: "Investimentos", tipo: "E" },
                ];


                // pega o id do usuário recém-criado
                const usuario = usuarioData[0]; 

                // agora insere as categorias padrão vinculadas ao usuário
                const { error: insertError } = await supabase
                .from("Categoria")
                .insert(
                    categoriasPadrao.map((cat) => ({
                    Nome: cat.nome,
                    Tipo: cat.tipo,
                    FK_ID_Usuario: usuario.id, // FK do usuário
                    }))
                );

                if (insertError) {
                    console.error("Erro ao inserir categorias:", insertError);
                }

                if (insertError) {
                    console.error("Erro ao inserir categorias padrão", insertError.message);
                } else {
                    navigate('/confirmarEmail');
                }                
            } catch (e) {
                console.error("Erro inesperado:", e);
            }                
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
