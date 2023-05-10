/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { json, useNavigate } from "react-router-dom";

function PaymentInformationScreen() {

    const productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [freights, setFreights] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [isCard, setIsCard] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        getAddresses();
    }, []);

    const getAddresses = async () => {
        const response = await fetch(`https://backend-evd-api.herokuapp.com/backoffice/user/address?id=${userInfo.idUser}`);

        if (response.status === 200) {
            response.json().then(res => {
                setAddresses(res);
            })
        }

        setLoading(false)
    }

    const getProducts = async () => {
        setLoading(true);
        const response = await fetch('https://backend-evd-api.herokuapp.com/products/cart', {
            method: 'POST',
            body: productCart,
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
                    setTotalPrice(total);
                    setTotalProductsCost(total);
                }
            });
        }
    }

    const calculateFreight = () => {
        const freight = [
            {
                cost: 20.00,
                days: 10,
                enterprise: "Sedex"
            },
            {
                cost: 12.00,
                days: 20,
                enterprise: "Loggi"
            },
            {
                cost: 22.00,
                days: 2,
                enterprise: "Fedex"
            }
        ];

        setFreights(freight);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let jsonReq = [];

        for (let prod of products) {
            jsonReq.push(
                {
                    idUser: userInfo.idUser,
                    idProduct: prod.idProduct,
                    quantity: prod.quantity,
                    totalPrice: (prod.quantity * prod.cost),
                    idAddress: addresses[0].idAddress,
                    idPayment: isCard ? 1 : 2,
                    status: isCard ? "AGUARDANDO BOLETO" : "AGUARDANDO EMISSAO"
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
                navigate('/sale/confirm')
            });
        } else {
            alert('Erro ao finalizar o pedido, tente mais tarde!');
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
                        <section className="container-login">
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
                                    <input type="submit" value="Finalizar pagamento"/>
                                </div>
                            </form>
                        </section>
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
                                                </section>
                                            </span>
                                        </span>
                                    );
                                })}
                            </section>
                            <section className="cart-products-info">
                                <span className="short-desc-product-info">Resumo do carrinho: </span>
                                <span className="total-products">
                                    <p style={{ fontSize: "24px" }}>{products.length} produtos</p>
                                    <p style={{ fontSize: "24px" }}>R$ {totalProductsCost}</p>
                                </span>
                                <hr />
                                <span className="cart-sub-total">
                                    <p><b>Total: </b></p>
                                    <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice} </p>
                                </span>
                                <br />
                                <section className="calculate-freight-section">
                                    <p>Selecione o endereço para calcular frete: </p>
                                    {
                                        addresses.map((data) => {
                                            return (
                                                <>
                                                    <section className="unit-freight">
                                                        <p>{data.streetName} - {data.cep} </p>
                                                        <button className="btn-calculate-freight" onClick={() => calculateFreight()}>Pesquisar fretes disponíveis</button>
                                                    </section>
                                                </>
                                            );
                                        })
                                    }
                                </section>
                                <br />
                            </section>
                        </main>
                    </>
            }
        </>
    );

}

export default PaymentInformationScreen;