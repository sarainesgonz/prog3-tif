import React, { useState } from "react";

function ArticleCard(props) {
    const {title, created_at, abstract, content, image } = props;
// author solo esta devolviendo un id

    //luego implementar view_count, reactions
    return (
        <div>
            <h1>{title}</h1>
            <h2>{abstract}</h2>
            <div>
                <p>{content}</p>
                <img src={image} alt="" />
            </div>
            <div>
                {/* <p>{author}</p> */}
                <p>{created_at}</p>
            </div>

        </div>
    )
} 
export default ArticleCard;