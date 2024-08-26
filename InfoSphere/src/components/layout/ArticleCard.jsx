import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function ArticleCard(props) {
    const { title, created_at, abstract, content, image, author } = props;
    const formatDate = new Date(created_at).toLocaleDateString(); //fecha formato normal

    return (
        <div className="col-lg-4 col-md-6 mb-4 d-flex">
            <div className="card flex-fill">

                <img src={image} alt="" className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                {/* <p>{content}</p> */}
                <div className="card-body d-flex flex-column">
                    <h1 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c214b' }}>{title}</h1>
                    <h3 className="card-text">{abstract}</h3>
                    <p className="card-text mt-auto"><small className='text-muted'>Publicado: {formatDate}</small></p>
                    <Link to={'/login'} className="btn btn-dark mt-2">Leer mas</Link>
                </div>
            </div>
        </div>
    )
}
export default ArticleCard;