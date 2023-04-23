import React, { useState, useEffect, useRef } from "react";
import "./ProductDetails.css"
import greetingMessage from '../../../utils/HoursUtils'
import ClipLoader from 'react-spinners/ClipLoader';
import Banner from "../../../components/Banner/BannerComponent";


function ProductDetailsScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const carousel = useRef(null);


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

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick = (e) => {
        e.preventDefault();

        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    if (!products || !products.length) return null;

    return (
        <>
            <Banner />
            {loading ?
                <>
                    <div class='container-spinner'>
                        <ClipLoader color={'#000'} size={150} />
                    </div>
                </> :
                <>
                    <main className="main-details-products">
                        <h3 className="greeting-message">{greetingMessage()}</h3>
                        <h4 className="initial-message">Visualize alguma de nossas ofertas para você!</h4>

                        <div className="carousel" ref={carousel}>
                            {products.map((item) => {
                                const { idProduct, nameProduct, cost, file } = item;
                                return (
                                    <div className="item" key={idProduct}>
                                        <div className="image">
                                            <img src={file} alt={nameProduct} />
                                        </div>
                                        <div className="info">
                                            <span className="name">{nameProduct}</span>
                                            <span className="   ">U$ {cost}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </main>
                </>
            }
        </>
    );
}

export default ProductDetailsScreen;

