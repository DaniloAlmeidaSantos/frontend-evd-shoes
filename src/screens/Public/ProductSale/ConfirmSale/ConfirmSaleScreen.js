import React, { useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmSaleScreen(props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
                        <h2 style={{color: "green", fontSize: "24px"}}>Número do pedido: {location.state.orderNum} </h2>
                        <h3 style={{color: "black"}}>Parabéns você realizou sua compra :) Retorne para nossa página inicial! </h3>
                        <div class="btnRegister">
                            <input type="submit" value="Voltar para tela inicial" onClick={() =>  navigate('/')}/>
                        </div>
                    </main>
            }
        </>
    );

}

export default ConfirmSaleScreen;