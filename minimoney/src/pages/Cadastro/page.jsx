import React from 'react';

import './style.css';

import Button from '../../Components/Button/button';

import { useNavigate } from 'react-router-dom';

import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

function Cadastro() {
    const navigate = useNavigate();
    const Voltar = () => {
        navigate('/');
    }
    return (
        <div className="card">
            <div className="card-Central">
                <h1>Cadastrar</h1>

                <div className="input-group">
                    <label>Nome</label>
                    <IoPersonCircleOutline className="icon"/>
                    <input type="text" placeholder="Nome" />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <MdOutlineEmail className="icon"/>
                    <input type="email" placeholder="Email" />
                </div>

                <div className="input-group">
                    <label>Nome</label>
                    <FaLock className="icon"/>
                    <input type="password" placeholder="Senha" />
                </div>

                <div className='card-Button'>
                    <Button children={'Voltar'} onClick={Voltar}></Button>
                    <Button children={'Cadastrar'}></Button>                    
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
