import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import useFetch from "./useFetch";
import ArticleCard from "./layout/ArticleCard";
import "../styles/HomePage.css";
import NavBar from "./layout/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

function HomePage(props) {
    /* displays all the articles, and the navbar if the user is authenticated*/

    const { authState } = useAuth();
    const { isAuth } = authState
    const [url, setUrl] = useState("https://sandbox.academiadevelopers.com/infosphere/articles/");
    const { data, loading, error } = useFetch(url, { method: "GET" });
    const [page, setPage] = useState(1);
    const [randomArticle, setRandomArticle] = useState(null);
    const defaultImage = "../../public/defaultImage.jpeg";

    useEffect(() => {
        setUrl(`https://sandbox.academiadevelopers.com/infosphere/articles/?page=${page}`);
    }, [page])

    useEffect( () => {
        if (data && data.results.length > 0) {
            const articleLongTitle = data.results.filter(article => article.title.split(' ').length > 4);
            if (articleLongTitle.length > 0) {
                const randomIndex = Math.floor(Math.random() * articleLongTitle.length);
                setRandomArticle(articleLongTitle[randomIndex]);
            }
        
        }
    }, [data])

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

            {randomArticle && (
                <div className="container-fluid vh-100 position-relative p-0"> 
                    <img src={randomArticle.image  || defaultImage} alt={randomArticle.title} className="w-100 h-100 position-absolute" style={{objectFit: 'cover', zIndex: -1}}/>
                   <div className="d-flex flex-column justify-content-center align-items-center text-white h-100" style={{backgroundColor: 'rgba(4, 4, 4, 0.7)'}}>
                        <h1 className="display-5 p-4" style={{fontWeight: 'bold'}}>{randomArticle.title}</h1>
                        <p className="lead text-white p-4">{randomArticle.abstract}</p>
                   </div>
                   <div className="d-flex justify-content-center position-absolute w-100" style={{bottom: '20px'}}>
                        <button onClick={handlePreviousPage} disabled={page <= 1} className="btn btn-dark me-4" style={{fontWeight: 'bold',  boxShadow: '0 0 8px 3px rgba(129, 157, 207, 0.8)'}}><FaArrowLeft className="me-2" /> Anterior</button>
                        <button onClick={handleNextPage} disabled={!data || !data.next} className="btn btn-dark" style={{fontWeight: 'bold', boxShadow: '0 0 8px 3px rgba(129, 157, 207, 0.8)'}}> Siguiente <FaArrowRight className="ms-2" /></button>
                    </div>
                </div>
            )}


            {/* <div className="d-flex justify-content-center my-3">
                <button onClick={handlePreviousPage} disabled={page <= 1} className="btn btn-primary me-2"> Anterior</button>
                <button onClick={handleNextPage} disabled={!data || !data.next} className="btn btn-primary">Siguiente</button>
            </div> */}
            <div className="container mt-5">
                <div className="row justify-content-center">

                    {/* <h1>Articles</h1> */}
                    {loading ? (
                        <p className="text-center mb-5">Cargando articulos...</p>
                    ) : error ? (
                        <p>Ocurrio un error</p>
                    ) : data.results
                        .filter(article => article.title.split(' ').length > 4)
                        .map((article) => (
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

        </div>
    )
}

export default HomePage;