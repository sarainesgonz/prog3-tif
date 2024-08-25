import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useFetch from "../useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props) {
    const navigate = useNavigate() //navigate para cambiar de pagina una vez autenticado
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth()
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
                password
            }),
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
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
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center">Login</h1>

                            <form onSubmit={handleSubmit} className="m-4 p-4">
                                <div class="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <input required type="text" placeholder="Usuario" value={username} onChange={handleUsernameChange} id="formUsername" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input required type="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} id="formPassword" class="form-control" />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1e3a8a' }}>Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login;