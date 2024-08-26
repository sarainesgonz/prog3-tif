import NavBar from "./layout/NavBar";
import { useUser } from "./context/UserContext";
import { useEffect, useState } from 'react';
import useFetch from "./useFetch";
import { useAuth } from "./context/AuthContext";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyArticlesPage() {
    const { authState } = useAuth();
    const { token } = authState;
    const { userState } = useUser()
    const [myArticles, setMyArticles] = useState([])
    const [allArticles, setAllArticles] = useState([])
    const [fullyFetched, setFullyFetched] = useState(false) //controlar cuando cargaron todos
    const [url, setUrl] = useState("https://sandbox.academiadevelopers.com/infosphere/articles/")
    const { data, loading, error } = useFetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        credentials: "include"
    })

    useEffect(() => {
        if (data) {
            setAllArticles(previousAticles => [...previousAticles, ...data.results])
            if (data.next) {
                const nextUrl = data.next.replace("http://", "https://")
                setUrl(nextUrl)
            }
            else {
                setFullyFetched(true)
            }
        }
    }, [data])


    useEffect(() => {
        if (fullyFetched && userState) {
            const getMyArticles = allArticles.filter(article => article.author === userState.user__id);
            const orderedArticles = getMyArticles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            setMyArticles(orderedArticles)
            // console.log("Mis articulos creados por ni", myArticles)
        }
    }, [allArticles, userState, fullyFetched])

    return (
        <div>
            <NavBar />
            <h1 className="text-center">Mis artículos</h1>

            {loading || !fullyFetched ? (
                <p className="text-center">Cargando articulos...</p>
            ) : error ? (
                <p className="text-center">Ocurrio un error al cargar tus articulos</p>
            ) : myArticles.length > 0 ? (
                <div className="container mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha de creación</th>
                            <th>Título</th>
                            {/* <th>Descripcion</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {myArticles.map(article => (
                            <tr key={article.id}>
                                
                                <td>{new Date(article.created_at).toLocaleDateString()}</td>
                                <td>{article.title}</td>
                                {/* <td>{article.abstract}</td> */}
                                <td>
                                    <Link to={`/article/${article.id}`} className="btn btn-primary" >Leer</Link>
                                </td>
    
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (<p>No tenes articulos publicados</p>)}
        </div>
    )

}

export default MyArticlesPage;