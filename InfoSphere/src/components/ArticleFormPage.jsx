
import React, { useState} from "react";
import {useAuth} from "./context/AuthContext";
import NavBar from "./layout/NavBar";

function ArticleFormPage(props) {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const { authState } = useAuth();
    const { token } = authState;


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("abstract", abstract);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        // console.log(token);

        fetch("https://sandbox.academiadevelopers.com/infosphere/articles/", {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: formData,
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response.status);
                    return response.json().then((errorData) => {
                        console.log(errorData);
                        throw new Error("No estas autorizado para crear noticias");
                    }
                    )
                    //    throw new Error("Ocurrio un errory no se pudo crear la noticia");
                }
                console.log(response.status);
                return response.json();
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    console.log("articulo creado exitosamnete");
                }
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <NavBar/>
            <h3>Crea un articulo</h3>

            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} id="formTitle" />
                <textarea type="text" placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} id="formAbstract" />
                <textarea required type="text" placeholder="Contenido" value={content} onChange={(e) => setContent(e.target.value)} id="formContent" />
                <input type="file" placeholder="Imagen" onChange={(e) => setImage(e.target.files[0])} id="formImage" />
                <button type="submit">Crear Articulo</button>
            </form>
        </div>
    )
}

export default ArticleFormPage;