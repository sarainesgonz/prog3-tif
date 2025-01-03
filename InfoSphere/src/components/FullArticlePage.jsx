import NavBar from "./layout/NavBar";
import { useAuth } from "./context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Buttons from "./layout/Buttons";

function FullArticlePage() {
    const {id} = useParams()
    const { authState } = useAuth();
    const { token, isAuth } = authState;
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const { data, loading, error } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }, 
        credentials: "include"
    })

    useEffect(() => {
        if(data){
            setArticle(data)
        }
    }, [data])

    const handleDelete = () => {
        try {
            fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                credentials: "include"
            })
            .then(response => {
                if(response.ok){
                    alert("Articulo eliminado")
                    navigate(-1)
                } else {
                    alert("No se pudo eliminar el articulo")
                }
            })
        } catch (error) {
            throw new Error("Ocurrio un error")
        }
   
    }

    const handleEdit = () => {
        navigate(`/edit/${id}`)
    }

    const handleBackClick = () => {
        navigate(-1)
      }

return (
        <div>
            <NavBar />
            {/* <Buttons />  */}
            <div className="d-flex justify-content-end m-5">
                <button className="btn btn-primary me-2" onClick={handleEdit}>Editar</button>
                <button className="btn btn-secondary me-2" onClick={handleBackClick}>Volver</button>
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
            <div className="container m-5">
                {loading ? (
                    <p className="text-center">Cargando articulo...</p>
                ) : error ? (
                    <p className="text-center text-danger">Ocurrio un error</p>
                ) : article ? (
                    <div className="card">
                        <h1 className="card-title m-3"  style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2c214b' }} >{article.title}</h1>
                        <h2 className="card-subtitle m-3 text-muted">{article.abstract}</h2>
                        <div className="text-center mb-4">
                        <img src={article.image} alt="article" className="img-fluid"/> 
                        </div>
                        <p className="card-text m-3">{article.content}</p>
                        {/* <p>{article.author}</p> */}
                      </div>
                ) : (
                    <p className="text-center">No hay articulos</p>
                )}      
        </div>
        </div>
)
}

export default FullArticlePage;