import React from "react";
import NavBar from "./layout/NavBar";
import { useUser} from "./context/UserContext";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from 'react';
import useFetch from "./useFetch";

function DashboardPage(props) {
    // se debe poder navegar a la homepage, reaccionar a las noticias, crear noticias
    const { authState } = useAuth();
    const { token } = authState;
    const { userState, setUserState } = useUser()
    const { data, loading, error } = useFetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            credentials: "include",
        });


    useEffect(() => {
        if (data && !loading && !error) {
            setUserState(data)
            console.log("Desde el dashboard", data)

        }
    }, [data, setUserState]);


    return (
        <div>
            <h1>Soy un dashboard</h1>
            {userState && <h1>Hola {userState.first_name}</h1>}
            <NavBar />
        </div>
    )
}

export default DashboardPage;