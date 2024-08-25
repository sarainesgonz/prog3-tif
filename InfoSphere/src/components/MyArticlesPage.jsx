import NavBar from "./layout/NavBar";
import { useUser } from "./context/UserContext";
import { useEffect, useState } from 'react';
import useFetch from "./useFetch";
import { useAuth } from "./context/AuthContext";

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
                setUrl(data.next)
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
            console.log("Mis articulos creados por ni", myArticles)
        }
    }, [ allArticles, userState, fullyFetched])

    return (
        <div>
            <NavBar />
            <h1>My Articles</h1>

            {loading || !fullyFetched ? (
                    <p>Cargando articulos...</p>
                ) : error ? (
                    <p>Ocurrio un error al cargar tus articulos</p>
                ) : myArticles.length > 0 ? ( 
                <ul> {myArticles.map(article => (
                    <li key={article.id}>{article.title}</li>))}
                </ul>
                ) : (<p>No tenes articulos publicados</p>)}
        </div>
    )

}

export default MyArticlesPage;