/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import './ProductsImageRegister.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProductsImageRegister({ object }) {
    
    
    const handleRemoveItem = (index) => {
        if (index != null) {
            object.splice(index);
        }
    }

    const handleAddImageDefault = (index) => {
        for(let i = 0; i < object.length; i++) {
            if(i === index) {
                object[i].fileDefault = 'S';
            } else {
                object[i].fileDefault = 'N';
            }
        }
        console.log(object)
    }

    return (
        <section className="block-products-image">
            {object.map((data, index) => {
                return (
                    <>
                        <span className="remove-item" onClick={() => handleRemoveItem(index)} >
                            <FontAwesomeIcon size="2x" icon={faXmark} />
                        </span>
                        <img src={data.file} className="products-register-image" />
                        <span className="image-default" onClick={() => handleAddImageDefault(index)} >
                            <input type="radio" name="checkedMain" id="off" checked={data.fileDefault==='S'}/>
                        </span>
                    </>
                )
            })}
        </section>
    )
}

export default ProductsImageRegister;