import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import ArticleCard from "./layout/ArticleCard";
import "../styles/HomePage.css";
import NavBar from "./layout/NavBar";

function HomePage(props) {
/* displays all the articles, and the navbar if the user is authenticated*/
    const [articles, setArticles] = useState([]);
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const {authState} = useAuth();
    const {isAuth} = authState

    useEffect(() => {

        fetch("https://sandbox.academiadevelopers.com/infosphere/articles/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Se produho un error")
                }
                return response.json();
            })
            .then((data) => {
                setArticles(data.results);
                setIsLoading(false);
                console.log(data);
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
    }, []);

    return (
        <div>
        <div>
            {isAuth ? <NavBar/> : null}
        </div>
        <div className="articles">
            {/* <h1>Articles</h1> */}
            {isloading ? (
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