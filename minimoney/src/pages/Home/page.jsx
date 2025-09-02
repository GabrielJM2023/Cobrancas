import React from "react";
import './style.css'
import NavBar from "../../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Home(){
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