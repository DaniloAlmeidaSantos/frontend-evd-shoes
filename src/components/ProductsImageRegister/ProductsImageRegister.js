/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import './ProductsImageRegister.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProductsImageRegister({ object }) {
    const [valueDefault, setValueDefault] = useState(0)

    const handleRemoveItem = (index) => {
        if (index != null) {
            object.splice(index);
        }
    }

    const handleAddImageDefault = (index) => {
        for (let i = 0; i < object.length; i++) {
            if (i === index) {
                object[i].fileDefault = 'S';
                setValueDefault(object[i].idImage);
            } else {
                object[i].fileDefault = 'N';
            }
        }
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
                            <input 
                                type="radio" 
                                name="checkedMain" 
                                id="off" 
                                checked={data.fileDefault === 'S' || valueDefault === data.idImage} 
                                // onChangeValue={} 
                            />
                        </span>
                    </>
                )
            })}
        </section>
    )
}

export default ProductsImageRegister;