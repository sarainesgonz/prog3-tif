import { useEffect, useState } from "react";
import ArticleCard from "./layout/ArticleCard";

function HomePage(props) {
    // logica para traer los art y que se renderizen con la card
    const [articles, setArticles] = useState([]);
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

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
                // console.log(data);
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
    }, []);

    return (
        <div>
            <h1>Articles</h1>
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
                    // author={article.author} 
                />)
            )}
        </div>
    )
}

export default HomePage;