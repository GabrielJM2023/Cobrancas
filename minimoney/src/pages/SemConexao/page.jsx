import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button";
import Error from './Error.svg'
import './style.css'

function SemConexao(){
    const navigate = useNavigate();

    const Voltar=()=>{
        navigate(-1)
    }

    return(
        <div className="card-Central sem-conexao">
            <img src={Error} alt="Erro 404"/>
            <h1>Ops! Parece que você está sem conexão com a internet.</h1>
            <Button children={'Voltar'} onClick={Voltar}></Button>
        </div>
    )

}

export default SemConexao;