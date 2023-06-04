import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import CartSummaryComponent from "../../../../components/CartSummary/CartSummaryComponent";

function DetailsSaleScreen() {
    let productCart = localStorage.getItem('cart');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);


    useEffect(() => {
        getProducts();
        setLoading(false);
    }, []);

    const getProducts = async () => {
        setLoading(true);
        let cart = JSON.parse(productCart);
        const response = await fetch('https://backend-evd-api.herokuapp.com/products/cart', {
            method: 'POST',
            body: JSON.stringify(cart.products),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (response.status === 200) {
            response.json().then(res => {
                setProducts(res);
                let total = 0;
                for (let totalPrice of res) {
                    total = total + parseFloat(totalPrice.totalPrice);
                }
                setTotalPrice(total);
                setTotalProductsCost(total);
            });
        }
    }

    return (
        <>
            <BuyFlowComponent flowStatus={1} />

            {
                loading ?
                    <>
                        <div class='container-spinner'>
                            <ClipLoader color={'#000'} size={150} />
                        </div>
                    </> :
                    <main className="container-cart-product">
                        <section className="cart-products-section">
                            {products.map((data, index) => {
                                return (
                                    <span className="products-cart-info">
                                        <img className="cart-image" src={data.file} alt="Produto no carrinho" />
                                        <span className="products-description">
                                            <h2 className="product-title">{data.brand}</h2>
                                            <p style={{ "fontSize": "22px", "color": "black", "marginBottom": "7%" }}>{data.nameProduct} </p>
                                            <section className="infos">
                                                <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>R$ </span> {data.cost} </p>
                                                <p style={{ "fontSize": "24px", color: "green" }}><span style={{ "fontSize": "22px" }}>Unidades: </span> {data.quantity} </p>
                                            </section>
                                        </span>
                                    </span>
                                );
                            })}
                        </section>
                        <CartSummaryComponent
                            totalPrice={totalPrice}
                            productsPrice={totalProductsCost}
                            products={products}
                            typeSection={"cart"}
                            link={"/sale/payment"}
                            buttonValue={"Ir para pagamento"}
                        />
                    </main>
            }
        </>
    );

}

export default DetailsSaleScreen;