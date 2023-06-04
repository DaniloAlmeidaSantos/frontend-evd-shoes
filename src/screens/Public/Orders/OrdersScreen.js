import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function GetOrders() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getProducts();
    }, []);

    const getProducts = async () => {
        const data = await fetch(`http://localhost:8080/products/orders?id=${userInfo.idUser}`);
        const getResults = await data.json();
        if (getResults !== null) {
            setProducts(getResults);
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading ?
                    <>
                        <div class='container-spinner'>
                            <ClipLoader color={'#000'} size={150} />
                        </div>
                    </> :
                    <>
                        <main className="main-details-products">
                            <h1>Pedidos realizados</h1>
                            <section className="cart-products-section">
                                {products.map((data, index) => {
                                    return (
                                        <span className="orders-card">
                                            <span className="products-description">
                                                <p style={{ "fontSize": "26px", "color": "black", "marginBottom": "7%" }}>
                                                    <b style={{ "fontSize": "28px" }}>Número do pedido: </b>
                                                    {data.idSale}
                                                </p>
                                                <section className="infos">
                                                    <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>Transportadora: </span> {data.freight || 'Sedex'} </p>
                                                    <p style={{ "fontSize": "24px", color: "black" }}><span style={{ "fontSize": "26px" }}>Valor total do pedido: </span> {data.totalPrice} </p>
                                                    <p style={{ "fontSize": "18px", color: "red" }}><span style={{ "fontSize": "18px" }}>Data da venda: </span> <b>{data.orderDate} </b></p>
                                                    <p style={{ "fontSize": "18px", color: "red" }}><span style={{ "fontSize": "18px" }}>Status do pedido: </span> <b>{data.orderStatus} </b></p>
                                                    <a href={`/orders/details/${data.idSale}`}>
                                                        <p className="btn-view-details">Ver detalhes / Alterar status</p>
                                                    </a>
                                                </section>
                                            </span>
                                        </span>
                                    );
                                })}
                            </section>
                        </main>
                    </>
            }
        </>
    );
}

export default GetOrders;

