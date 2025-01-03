import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function ArticleCard(props) {
    const { title, created_at, abstract, content, image, author } = props;
    const formatDate = new Date(created_at).toLocaleDateString(); //fecha formato normal
    const defaultImage = "/defaultImage.jpeg";
    const { authState } = useAuth();
    const { isAuth } = authState;

    return (
        <div className="col-lg-6 col-md-6 mb-4 d-flex">
            <div className="card flex-fill">

                <img src={image || defaultImage} alt="" className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                {/* <p>{content}</p> */}
                <div className="card-body d-flex flex-column">
                    <h1 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c214b' }}>{title}</h1>
                    <h3 className="card-text">{abstract}</h3>
                    <p className="card-text mt-auto"><small className='text-muted'>Publicado: {formatDate}</small></p>
                    {/* <Link to={'/login'} className="btn btn-dark mt-2">Leer mas</Link> */}
                    <Link to={isAuth ? '/not-found' : '/login'} className="btn btn-dark mt-2">Leer más</Link>
                </div>
            </div>
        </div>
    )
}
export default ArticleCard;