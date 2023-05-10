import React, { useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { useNavigate } from "react-router-dom";

function ConfirmSaleScreen() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                        <h1>Parabéns você realizou sua compra :) Retorne para nossa página inicial! </h1>
                        <div class="btnRegister">
                            <input type="submit" value="Voltar para tela inicial" onClick={() =>  navigate('/')}/>
                        </div>
                    </main>
            }
        </>
    );

}

export default ConfirmSaleScreen;