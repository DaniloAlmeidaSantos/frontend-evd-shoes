/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import './ProductsImageRegister.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProductsImageRegister({ object }) {
    return (
        <section className="block-products-image">
            {object.map((data, index) => {
                return (
                    <>
                        <button className="remove-item" >
                            <FontAwesomeIcon size="2x" icon={faXmark}/>
                        </button>
                        <img src={data.file} className="products-register-image" />
                    </>

                )
            })}
        </section>
    )
}

export default ProductsImageRegister;