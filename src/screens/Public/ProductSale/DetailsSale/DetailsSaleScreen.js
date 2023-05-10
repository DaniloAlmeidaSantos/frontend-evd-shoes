import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { useNavigate } from "react-router-dom";

function DetailsSaleScreen() {

    const productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [freights, setFreights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        getAddresses();
    }, []);

    function removeItem(index) {
        let newProducts = JSON.parse(productCart);
        newProducts.splice(index, 1);

        setProducts(newProducts);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(newProducts));
        window.location.reload(true);
    }

    const getAddresses = async () => {
        const response = await fetch(`http://localhost:8080/backoffice/user/address?id=${userInfo.idUser}`);

        if (response.status === 200) {
            response.json().then(res => {
                setAddresses(res);
            })
        }

        setLoading(false)
    }

    const getProducts = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8080/products/cart', {
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
                                                <button className="btn-remove-product-cart" onClick={() => removeItem(index)}>Remover item</button>
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
                            <button className="btn-continue-buy" onClick={() => navigate('/sale/payment')} >Ir para o pagamento</button>
                        </section>
                    </main>
            }
        </>
    );

}

export default DetailsSaleScreen;