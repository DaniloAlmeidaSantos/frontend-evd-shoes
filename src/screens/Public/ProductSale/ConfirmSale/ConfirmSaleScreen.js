import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { useLocation, useNavigate } from "react-router-dom";
import CartSummaryComponent from "../../../../components/CartSummary/CartSummaryComponent";

function ConfirmSaleScreen(props) {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [productsPrice, setProductsPrice] = useState(0);
    const [freight, setFreight] = useState(0);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await fetch(`https://backend-evd-api.herokuapp.com/products/orders/summary?id=${JSON.parse(location.state.orderNum)}`);

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
            <BuyFlowComponent flowStatus={3} />
            {
                loading ?
                    <>
                        <div class='container-spinner'>
                            <ClipLoader color={'#000'} size={150} />
                        </div>
                    </> :
                    <main className="container-cart-product" style={{display: "flex", flexDirection: "column"}}>
                        <h2 style={{color: "green", fontSize: "24px"}}>Número do pedido: {JSON.parse(location.state.orderNum)} </h2>
                        <h3 style={{color: "black"}}>Parabéns você realizou sua compra :) Retorne para nossa página inicial! </h3>

                        <CartSummaryComponent
                            orders={orders}
                            productsPrice={productsPrice}
                            status={status}
                            id={Number(location.state.orderNum)}
                            freight={freight}
                        />
                    </main>
            }
        </>
    );

}

export default ConfirmSaleScreen;