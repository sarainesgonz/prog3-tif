import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import useFetch from "./useFetch";
import ArticleCard from "./layout/ArticleCard";
import "../styles/HomePage.css";
import NavBar from "./layout/NavBar";

function HomePage(props) {
    /* displays all the articles, and the navbar if the user is authenticated*/

    const { authState } = useAuth();
    const { isAuth } = authState
    const [url, setUrl] = useState("https://sandbox.academiadevelopers.com/infosphere/articles/");
    const { data, loading, error } = useFetch(url, { method: "GET" });
    const [page, setPage] = useState(1);


    useEffect(() => {
        setUrl(`https://sandbox.academiadevelopers.com/infosphere/articles/?page=${page}`);
    }, [page])

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    }

    const handleNextPage = () => {
        if (data && data.next) {
            setPage((prevPage) => prevPage + 1);
        }
    }


    return (
        <div>
            <div>
                {isAuth ? <NavBar /> : null}
            </div>
            <div>
                <button onClick={handlePreviousPage} disabled={page <= 1}>Anterior</button>
                <button onClick={handleNextPage} disabled={!data || !data.next}>Siguiente</button>
            </div>
            <div className="articles">

                {/* <h1>Articles</h1> */}
                {loading ? (
                    <p>Cargando articulos...</p>
                ) : error ? (
                    <p>Ocurrio un error</p>
                ) : data.results.map((article) => (
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