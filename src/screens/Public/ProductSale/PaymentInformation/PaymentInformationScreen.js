/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { useNavigate } from "react-router-dom";
import Calculator from "../../../../utils/CalculateFreight";


function PaymentInformationScreen() {

    const productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCard, setIsCard] = useState(true);
    const [isHandleSubmit, setHandleSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const json = JSON.parse(productCart).products;
        const response = await fetch('https://backend-evd-api.herokuapp.com/products/cart', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (response.status === 200) {
            response.json().then(res => {
                setProducts(res);
                let total = 0;
                const freight = Calculator(JSON.parse(productCart).freight);
                res.map(data => total = total + (data.quantity * data.cost));
                setTotalPrice(freight + total);
                setLoading(false);
            });
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async () => {
        if (isHandleSubmit) {
            let jsonReq = [];
            setLoading(true);
            const address = JSON.parse(productCart).address;
            for (let prod of products) {
                jsonReq.push(
                    {
                        idUser: userInfo.idUser,
                        idProduct: prod.idProduct,
                        quantity: prod.quantity,
                        totalPrice: totalPrice,
                        idAddress: address.idAddress,
                        deliveryCompany: JSON.parse(productCart).freight,
                        saleAddress: `${address.cep} - ${address.streetName}, ${address.number}, ${address.complement || ''}`,
                        idPayment: isCard ? 2 : 1,
                        status: "AGUARDANDO PAGAMENTO"
                    }
                )
            }

            let response = await fetch(
                'https://backend-evd-api.herokuapp.com/products/confirm/sell',
                {
                    method: 'POST',
                    body: JSON.stringify(jsonReq),
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                localStorage.removeItem('cart');
                response.json().then(resp => {
                    navigate('/sale/confirm', { state: { orderNum: JSON.stringify(resp.message) } })
                });
                setLoading(false);
            } else {
                alert('Erro ao finalizar o pedido, tente mais tarde!');
            }
        } else {
            setHandleSubmit(true);
        }
    };

    return (
        <>
            <BuyFlowComponent flowStatus={2} />
            {
                loading ?
                    <>
                        <div class='container-spinner'>
                            <ClipLoader color={'#000'} size={150} />
                        </div>
                    </> :
                    <>
                        {
                            isHandleSubmit && productCart ?
                                <>
                                    <section className="cart-products-info" style={{ padding: '100px' }}>
                                        <span className="total-products">
                                            <p style={{ fontSize: "24px" }}>{products.length} produtos</p>
                                            <p style={{ fontSize: "24px" }}>R$ {totalPrice - Calculator(JSON.parse(productCart).freight)}</p>
                                        </span>
                                        <span className="total-products">
                                            <p style={{ fontSize: "24px" }}>Valor do frete ({JSON.parse(productCart).freight || 'Sedex'}): </p>
                                            <p style={{ fontSize: "24px" }}>R$ {Calculator(JSON.parse(productCart).freight)}</p>
                                        </span>
                                        <hr />
                                        <span className="cart-sub-total">
                                            <p><b>Método de pagamento: </b></p>
                                            <p style={{ color: "green", fontSize: "20px" }}>{isCard ? 'Cartão de crédito' : 'Débito'} </p>
                                        </span>
                                        <span className="cart-sub-total">
                                            <p><b>Total: </b></p>
                                            <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice} </p>
                                        </span>
                                        <br />
                                        <div class="btnRegister">
                                            <input type="submit" value="Continuar?" onClick={() => handleSubmit()} />
                                            <input type="submit" style={{marginTop: '20px'}} value="Voltar para pagamento" onClick={() => setHandleSubmit(false)} />
                                        </div>

                                    </section>
                                </>
                                : <>
                                    <section className="container-login">
                                        <h3 style={{ color: "green" }}>Total a pagar: {totalPrice}</h3>
                                        <ul className="nav-links">
                                            <li><span onClick={() => setIsCard(true)} >Pagar com cartão</span></li>
                                            <li><span onClick={() => setIsCard(false)}>Pagar com boleto</span></li>
                                        </ul>
                                        <form onSubmit={handleSubmit}>

                                            {isCard ?
                                                <>
                                                    <h1>Informações do cartão</h1>
                                                    <label for="card-number">Número do cartão:
                                                        <input type="text" id="card-number" name="cardNumber" onChange={handleInputChange} value={formValues.cardNumber || ''} required maxLength={18} />
                                                    </label>
                                                    <label for="username">Nome completo:
                                                        <input type="text" id="username" name="username" onChange={handleInputChange} value={formValues.username || ''} required maxLength={160} />
                                                    </label>
                                                    <section style={{ display: "flex", flexDirection: "row" }}>
                                                        <label for="verifyCode">Código verificador:
                                                            <input type="text" id="verifyCode" name="verifyCode" onChange={handleInputChange} value={formValues.verifyCode || ''} required maxLength={4} />
                                                        </label>
                                                        <label style={{ marginLeft: "5px" }} class="label-age">
                                                            Data de vencimento:
                                                        </label>
                                                        <input
                                                            class="input"
                                                            type="date"
                                                            placeholder=" Data de vencimento"
                                                            name="expireDate"
                                                            onChange={handleInputChange} style={{ textAlign: "left" }} value={formValues.expireDate || ''} required />
                                                    </section>
                                                    <label for="installments">Parcelas:
                                                        <input
                                                            type="number"
                                                            name="installments"
                                                            step="1"
                                                            max={12}
                                                            placeholder="Número de parcelas"
                                                            required
                                                            onChange={handleInputChange}
                                                            value={formValues.installments || ''}
                                                        />
                                                    </label>
                                                </> : <>
                                                    <h1>Informações para o boleto</h1>
                                                    <label for="username">Nome completo:
                                                        <input type="text" id="username" name="username" onChange={handleInputChange} value={formValues.username || ''} required maxLength={16} />
                                                    </label>
                                                </>
                                            }
                                            <div class="btnRegister">
                                                <input type="submit" value="Finalizar pagamento" />
                                            </div>
                                        </form>
                                    </section>
                                </>
                        }
                    </>
            }
        </>
    );

}

export default PaymentInformationScreen;