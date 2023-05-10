import React from "react";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CardProducts({item}) {
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
                    <a href="#" className="btn-home-cart">
                        <FontAwesomeIcon size="1x" icon={faCartPlus} className="plus-cart" />
                        Carrinho
                    </a>
                </span>
            </div>
        </a>
    );
}

export default CardProducts;