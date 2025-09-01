import React from "react";
import './style.css'
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    const Voltar =()=>{
        navigate('/');
    }
    return(
        <div className="CardHome">
            <NavBar/>
            <div className="classChildren">
                <Outlet/>
            </div>
        </div>
    )

}

export default Home;