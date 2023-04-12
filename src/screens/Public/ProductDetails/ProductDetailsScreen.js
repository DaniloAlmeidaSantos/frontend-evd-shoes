import React, { useState, useEffect } from "react";
import "./ProductDetails.css"
import { wait } from "@testing-library/user-event/dist/utils";

function ProductDetailsScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    });

    const getProducts = async () => {
        const data = await fetch("https://backend-evd-api.herokuapp.com/backoffice/products");
        const getResults = await data.json();
        setProducts(getResults);
    }
    // Dados e indices
    // const teste = [1, 2, 3, 4];
    // teste[1] <==> 2
    return (
        <>
            <main>
                <h1 class="titulo">TÊNIS DA EVD SHOES</h1>
                <subtitulo>
                    Realce seu estilo aderindo um calçado da EVD SHOES. A EVD reuniu uma coleção online com o melhores tênis do
                    mundo, em uma só plataforma online.
                </subtitulo>

                {products.map((data, index) => {

                    return (
                        <>
                            <div class="product-images">
                                <figure>
                                    <img src="" alt="Descrição da imagem X" />
                                    <figcaption> {data.nameProduct} </figcaption>
                                    <figdetails> {data.description} </figdetails>
                                    <p>
                                        <productvalues> R$ {data.cost} </productvalues><br/>
                                        <productvalues> 10 x R$ 100</productvalues>
                                    </p>
                                </figure>
                            </div>
                        </>
                    )

                })}

            </main>


        </>

    )
}

export default ProductDetailsScreen;

