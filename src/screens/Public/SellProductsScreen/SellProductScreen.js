/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./SellProductsScreen.css";
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <>
            {!loading ?
                <>
                    <main className="main-product-sell">
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
                            <h2 className="product-title">{formValues.brand}</h2>
                            <p style={{ "fontSize": "22px", "color": "black", "marginBottom": "7%" }}>{formValues.nameProduct} </p>
                            <section className="infos">
                                <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>R$ </span> {formValues.cost} </p>
                            </section>
                            <section className="products-others-infos">
                                <a href="#" className="frete">Calcular frete</a>
                            </section>
                            <section className="products-buttons-sell">
                                <a href="#" className="btn-buy">Comprar</a>
                                <a href="#" className="btn-cart">
                                    <FontAwesomeIcon size="1x" icon={faCartPlus} className="plus-cart" />
                                    Carrinho
                                </a>
                            </section>
                        </section>
                    </main>
                    <text className="product-details-title">Os detalhes</text>
                    <section className="products-details">
                        <section className="description">
                            <p style={{ "color": "black" }}>
                                <b>Descrição:</b>
                            </p>
                            <text className="product-description">
                                {formValues.description}
                            </text>
                        </section>
                        <section className="rating">
                            <p style={{ "color": "black" }}>
                                <b>Avaliação: </b>
                            </p>
                            <text className="product-description">
                                {formValues.ratio}
                            </text>
                        </section>
                    </section>
                </> : (
                    <div className='container-spinner'>
                        <ClipLoader color={'#000'} size={150} />
                    </div>
                )
            }
        </>
    );

}

export default SellProductsScreen;