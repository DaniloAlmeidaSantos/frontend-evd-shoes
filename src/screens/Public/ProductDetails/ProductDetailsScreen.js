import React, { useState, useEffect } from "react";
import "./ProductDetails.css"
import greetingMessage from '../../../utils/HoursUtils'
import ClipLoader from 'react-spinners/ClipLoader';


function ProductDetailsScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getProducts();
    }, []);

    const getProducts = async () => {
        const data = await fetch("https://backend-evd-api.herokuapp.com/backoffice/products/details");
        const getResults = await data.json();
        if (getResults !== null) {
            setProducts(getResults);
            setLoading(false);
        }
    }

    return (
        <>
            <main className="main-details-products">
                <h3 className="greeting-message">{greetingMessage()}</h3>
                <h4 className="initial-message">Visualize alguma de nossas ofertas para você!</h4>
                {loading ?
                    <>
                        <div className='container-spinner'>
                            <ClipLoader color={'#000'} size={150} />
                        </div>
                    </> :
                    <>
                        <div className="card-product">
                            {products.map((data, index) => {
                                return (
                                    <>
                                        <a href={`/sell/product/${data.idProduct}`} class="product-images">
                                            <figure>
                                                <img src={data.file} className="image-file" alt="Descrição da imagem X" />
                                                <figcaption className="brand-product" > {data.brand}</figcaption>
                                                <figdetails className="name-product"> {data.nameProduct}  </figdetails>
                                                <p>
                                                    <productvalues> R$ {data.cost} </productvalues><br />
                                                </p>
                                            </figure>
                                        </a>
                                    </>
                                )
                            })}
                        </div>
                    </>
                }
            </main>
        </>

    )
}

export default ProductDetailsScreen;

