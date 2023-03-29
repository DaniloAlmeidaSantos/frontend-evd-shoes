/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./SellProductsScreen.css";
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

let firstRequest = true;

function SellProductsScreen() {
    const [formValues, setFormValues] = useState({});
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageSelectedIndex, setImageSelectedIndex] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        getProductsForm();
        console.log(images)
    }, [])

    const changeSelectedImage = (index) => setImageSelectedIndex(index)

    const getProductsForm = async () => {
        let response = await fetch(
            'https://backend-evd-api.herokuapp.com/backoffice/product?id=' + id,
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
                const files = resp.productImages;
                setFormValues(resp);
                setImages(files);
            })
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
                                        <img src={data.file} className="products-sell-image" onClick={() => changeSelectedImage(index)} />
                                    </div>
                                </>
                            )
                        })}
                    </section>

                    <div className="block-principal-image">
                        {images.map((data, index) => {
                            return (
                                <>
                                    {index === imageSelectedIndex ?
                                        <>
                                            <img src={data.file} className="principal-image" />
                                        </> : <></>
                                    }
                                </>
                            )
                        })}
                    </div>

                    <section className="product-info">
                        <h1>{formValues.nameProduct}</h1>
                        <section>
                            <p style={{ color: "black" }}><b>R$ </b> {formValues.cost} </p>
                        </section>
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