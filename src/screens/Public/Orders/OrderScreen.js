import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams } from "react-router-dom";
import CartSummaryComponent from "../../../components/CartSummary/CartSummaryComponent";

function OrderScreen() {
    const { id } = useParams()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [productsPrice, setProductsPrice] = useState(0);
    const [freight, setFreight] = useState(0);


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await fetch(`http://localhost:8080/products/orders/summary?id=${id}`);

        if (response.status === 200) {
            response.json().then(res => {
                setOrders(res);
                let total = 0;
                setStatus(res[0].status);
                for (let r of res) {
                    total = total + (r.unitPrice * r.quantity);
                }
                setProductsPrice(total);
                setFreight(res[0].price - total)
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
                        <CartSummaryComponent
                            orders={orders}
                            productsPrice={productsPrice}
                            status={status}
                            id={id}
                            freight={freight}
                        />
                    </main>
            }
        </>
    );

}

export default OrderScreen;