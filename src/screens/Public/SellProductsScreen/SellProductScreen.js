/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./SellProductsScreen.css";
import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductsImageRegister from "../../../components/ProductsImageRegister/ProductsImageRegister";

function SellProductsScreen() {
    const [formValues, setFormValues] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageSelectedIndex, setImageSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        getProductsForm();
        console.log(formValues.productImages)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProductsForm = async () => {

        if (id != null) {
            let response = await fetch(
                'http://localhost:8080/backoffice/product?id=' + id,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )

            if (response.status === 200) {
                response.json().then(resp => {
                    setImages(resp.productImages);
                    setFormValues(resp);
                    console.log(images)
                })
            }
        }

        setLoading(false);
    }

    return (
        <main className="main-product-sell">
            {!loading ?
                <>
                    <section className="products-images">
                        {images.map((data, index) => {
                            return (
                                <>
                                    <div className="block-sell-product-image">
                                        <img src={data.file} className="products-sell-image" />
                                    </div>
                                </>
                            )
                        })}
                    </section>
                    <div className="block-principal-image">
                        <img src={images[imageSelectedIndex].file} />
                    </div>
                    <section className="product-info">
                        <h1>{formValues.nameProduct}</h1>
                    </section>
                </> : (
                    <div className='container-spinner'>
                        <ClipLoader color={'#000'} size={150} />
                    </div>
                )
            }
        </main>
    );

}

export default SellProductsScreen;