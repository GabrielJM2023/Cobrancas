import React from "react";
import './style.css'
import Button from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

function Categorias(){
    const navigate = useNavigate();

    const Voltar =()=>{
        navigate('/');
    }
    return(
        <div className="">
            <Button children={'Voltar'} onClick={Voltar}></Button>
        </div>
    )   

}

export default Categorias;