import React, { useState, useEffect, useRef } from "react";
import "./ProductDetails.css"
import greetingMessage from '../../../utils/HoursUtils'
import ClipLoader from 'react-spinners/ClipLoader';
import Banner from "../../../components/Banner/BannerComponent";
import CardProducts from "../../../components/card-products/CardProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



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
                        <h2 style={{ color: "black" }}>Novidades:</h2>
                        <div className="carousel" ref={carousel}>
                            {products.map((item) => {
                                return (
                                    <CardProducts item={item} />
                                );
                            })}

                        </div>
                        <div className="carousel-control-buttons">
                            <button onClick={handleLeftClick}>
                                <FontAwesomeIcon size="1x" icon={faChevronLeft} className="plus-cart" />
                                Anterior
                            </button>
                            <button onClick={handleRightClick}>
                                Próximo
                                <FontAwesomeIcon size="1x" icon={faChevronRight} className="plus-cart" />
                            </button>
                        </div>

                        <section className="all-products-home">
                            
                        </section>

                    </main>
                </>
            }
        </>
    );
}

export default ProductDetailsScreen;

