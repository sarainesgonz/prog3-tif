import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch from "../useFetch";

function Login(props) {
    const navigate = useNavigate() //navigate para cambiar de pagina una vez autenticado
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth()
    // const [url, setUrl] = useState(null)

    // const {data, loading, error} = useFetch("https://sandbox.academiadevelopers.com/api-auth/", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ 
    //         username, 
    //         password }),
    //     credentials: "include",
    // })

    // manejo los cambios que se hagan en los inputs y el submit
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("https://sandbox.academiadevelopers.com/api-auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                username, 
                password }),
            credentials: "include",
        })
        .then((response) => {
            if(!response.ok){
                alert("Usuario o contraseña incorrectos");
            }
            return response.json(); 
        })
        .then((data) => {
            if (data.token) {
                // console.log(data.token);
                login(data.token);
                navigate("/dashboard"); 
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
 

    return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="Usuario" value={username} onChange={handleUsernameChange} id="formUsername"/>
            <input required type="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} id="formPassword"/>
            <button type="submit">Ingresar</button>
        </form>
    </div>
)
  }
export default Login;