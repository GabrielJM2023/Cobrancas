import React from "react";
import './style.css'
import Button from "../../Components/Button/button";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    const Voltar =()=>{
        navigate('/');
    }
    return(
        <Button children={'Voltar'} onClick={Voltar}></Button>     
    )

}

export default Home;