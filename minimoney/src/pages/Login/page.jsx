import React from "react";
import Button from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

import './style.css'

function Logar(){
    const navigate = useNavigate();

    const Voltar =()=>{
        navigate('/');
    }
    return(
        <div>
            
            <h1>Login</h1>



            <label>Email</label>
            <input></input>
            <label>Senha</label>
            <input></input>
        
            <Button children={'Voltar'} onClick={Voltar}></Button>
            <Button children={'Entra'} onClick={Voltar}></Button>
        </div>
    )

}

export default Logar;