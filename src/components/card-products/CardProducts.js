import React from "react";

function CardProducts({ item }) {
    const { idProduct, nameProduct, cost, file } = item;

    return (
        <a href={`/sell/product/${idProduct}`}>
            <div className="item" key={idProduct}>
                <div className="image">
                    <img src={file} alt={nameProduct} />
                </div>
                <div className="info">
                    <span className="price-product">R$ {cost}</span>
                    <span className="name-product">{nameProduct}</span>
                </div>
                <span className="buttons-to-buy">
                    <a href={`/sell/product/${idProduct}`} className="btn-home-view">
                        Visualizar
                    </a>
                </span>
            </div>
        </a>
    );
}

export default CardProducts;