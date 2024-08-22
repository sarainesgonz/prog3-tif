import React from "react";
import NavBar from "./layout/NavBar";

function DashboardPage(props) {
    // se debe poder navegar a la homepage, reaccionar a las noticias, crear noticias
    return (
        <div>
            <h1>Soy un dashboard</h1>
            <NavBar/>
        </div>
    )
}

export default DashboardPage;