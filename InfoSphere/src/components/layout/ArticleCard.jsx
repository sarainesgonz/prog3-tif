import React, { useState } from "react";

function ArticleCard(props) {
    const {title, created_at, abstract, content, image, author } = props;
    const formatDate = new Date(created_at).toLocaleDateString(); //fecha formato normal

    //luego implementar view_count, reactions
    return (
        <div className="article">
            <h1>{title}</h1>
            <h2>{abstract}</h2>
            <div className="content-image">
                <img src={image} alt="" className="image"/>
                <p>{content}</p>
            </div>
            <div>
                <p>{author}</p>
                <p>Publicado: {formatDate}</p>
            </div>

        </div>
    )
} 
export default ArticleCard;