import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate, useParams } from "react-router-dom";

function OrderScreen() {
    const { id } = useParams()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsPrice, setProductsPrice] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/products/orders/summary?id=${id}`);

        if (response.status === 200) {
            response.json().then(res => {
                setOrders(res);
                let total = 0;
                for (let r of res) {
                    total = total + (r.unitPrice * r.quantity);
                }
                setProductsPrice(total);
                setLoading(false);
            });
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
                    <main className="container-cart-product">
                        <section className="cart-products-section">
                            {orders.map((data, index) => {
                                return (
                                    <span className="products-cart-info">
                                        <img className="cart-image" src={data.file} alt="Produto no carrinho" />
                                        <span className="products-description">
                                            <p style={{ "fontSize": "22px", "color": "black", "marginBottom": "7%" }}>{data.nameProduct} </p>
                                            <section className="infos">
                                                <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>R$ </span> {data.unitPrice} </p>
                                                <p style={{ "fontSize": "24px", color: "green" }}><span style={{ "fontSize": "22px" }}>Unidades: </span> {data.quantity} </p>
                                            </section>
                                        </span>
                                    </span>
                                );
                            })}
                        </section>
                        <section className="cart-products-info">
                            <span className="short-desc-product-info">Resumo do carrinho: </span>
                            <p style={{ fontSize: "24px", color: "black"}}>Número do pedido: {orders[0].idSale}</p>
                            <span className="total-products">
                                <p style={{ fontSize: "24px" }}>{orders.length} produtos</p>
                                <p style={{ fontSize: "24px" }}>R$ {productsPrice}</p>
                            </span>
                            <span className="total-products">
                                <p style={{ fontSize: "14px" }}>Endereço de entrega: {orders[0].saleAddress}</p>
                                <p style={{ fontSize: "14px", color: "green" }}>{orders[0].status}</p>
                            </span>
                            <hr />
                            <span className="cart-sub-total">
                                <p><b>Total: </b></p>
                                <p style={{ color: "green", fontSize: "24px" }}>R$ {orders[0].price} </p>
                            </span>
                            <br />
                            <button className="btn-continue-buy" onClick={() => navigate('/')}>Voltar</button>
                        </section>
                    </main>
            }
        </>
    );

}

export default OrderScreen;