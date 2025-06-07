import React from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import Button from '../../Components/Button/button'
import ConfirmarEmail from './ConfirmarEmail.svg'

function SemConexao(){
    const navigate = useNavigate();

    const Entrar=()=>{
        navigate('/Login')
    }

    return(
        <div className="card-Central ConfirmarEmail">
            <img src={ConfirmarEmail} alt="Confirmar Email" className="ImgConfirmarEmail"/>
            <h1>Cadastro realizado com sucesso!</h1>
            <p>Por favor, confirme seu e-mail através do link que enviamos para sua caixa de entrada.</p>
            <Button children={'Entrar'} onClick={Entrar}></Button>
        </div>
    )

}

export default SemConexao;