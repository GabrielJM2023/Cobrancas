import React from "react";
import { useNavigate } from "react-router-dom";
import './ConfirmarEmail.css'
import Button from '../../Components/Button/button'
import ConfirmarEmailFoto from './ConfirmarEmail.svg'

function ConfirmarEmail(){
    const navigate = useNavigate();

    const Entrar=()=>{
        navigate('/Login')
    }

    return(
        <div className="ConfirmarEmail">
            <div className="CE-CardCentral">
                <img src={ConfirmarEmailFoto} alt="Confirmar Email" className="ImgConfirmarEmail"/>
                <h1>Cadastro realizado com sucesso!</h1>
                <div className="textarea">
                    <p>Por favor, antes de fazer o login, confirme seu e-mail através do link que enviamos para sua caixa de entrada.</p>
                </div>
                <Button children={'Entrar'} onClick={Entrar}></Button>
            </div>
        </div>
    )

}

export default ConfirmarEmail;