import React from "react";
import './style.css'
import Button from "../../Components/Button/button";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function Home({children}){
    const navigate = useNavigate();

    const Voltar =()=>{
        navigate('/');
    }
    return(
        <div className="CardHome">
            <NavBar></NavBar>
            <Button children={'Voltar'} onClick={Voltar}></Button>     
        </div>
    )

}

export default Home;