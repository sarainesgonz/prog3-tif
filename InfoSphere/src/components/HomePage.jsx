import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import useFetch from "./useFetch";
import ArticleCard from "./layout/ArticleCard";
import "../styles/HomePage.css";
import NavBar from "./layout/NavBar";

function HomePage(props) {
/* displays all the articles, and the navbar if the user is authenticated*/

    const {authState} = useAuth();
    const {isAuth} = authState
    const [url, setUrl] = useState("https://sandbox.academiadevelopers.com/infosphere/articles/")   
    const {data, loading, error } = useFetch(url,{method: "GET"});
    const [articles, setArticles] = useState([])
    
    useEffect(() => {
        if(data && !loading) {
            setArticles(data.results)
        }
    }, [data, loading])

    const handlePreviousPage = () => {
        if(data.previous !== null){
            setUrl(data.previous);
        }
    }

    const handleNextPage = () => {
        if(data.next !== null) {
            setUrl(data.next)
        }
    }

    console.log(data);


    return (
        <div>
        <div>
            {isAuth ? <NavBar/> : null}
        </div>
        <div>
            <button onClick={handlePreviousPage}>Anterior</button>
            <button onClick={handleNextPage}>Sigueinte</button>
        </div>
        <div className="articles">

            {/* <h1>Articles</h1> */}
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Ocurrio un error</p>
            ) : articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    title={article.title}
                    created_at={article.created_at}
                    abstract={article.abstract}
                    content={article.content}
                    image={article.image}
                    author={article.author} 
                />)
            )}
        </div>

        </div>
    )
}

export default HomePage;