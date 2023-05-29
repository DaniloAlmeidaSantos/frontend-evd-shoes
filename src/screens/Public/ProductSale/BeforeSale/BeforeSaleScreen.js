import React, { useState, useEffect } from "react";
import './ProductCart.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from "react-router-dom";
import Calculator from "../../../utils/CalculateFreight";

function ProductCart() {
    let productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);
    const [address, setAddress] = useState({});
    const [showInputCep, setShowInputCep] = useState(false);
    const [freight, setFreight] = useState(JSON.parse(productCart).freight);
    const [idAddressDefault, setIdAddressDefault] = useState(0);
    const [inputAddress, setInputAddress] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        getProducts();
        getAddresses();
    }, []);

    const getAddresses = async () => {
        if (userInfo != null && !productCart.address) {
            const response = await fetch(`https://backend-evd-api.herokuapp.com/backoffice/user/address?id=${userInfo.idUser}`);

            if (response.status === 200) {
                response.json().then(res => {
                    setAddress(res);
                    setIdAddressDefault(res.idAddress);
                    let cart = productCart;
                    cart["address"] = res;
                    localStorage.removeItem('cart');
                    localStorage.setItem('cart', cart);
                })
            }
        } else {
            setAddress(JSON.parse(productCart).address);
        }

        setLoading(false)
    }

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
                    setTotalPrice(total);
                    setTotalProductsCost(total);
                }
            });
        }
    }

    const handleChangeRadioButton = (value, idAddress) => {
        let cart = JSON.parse(productCart);
        localStorage.removeItem('cart');
        cart = { ...cart, freight: value };
        cart = { ...cart, address: address };
        localStorage.setItem('cart', JSON.stringify(cart));
        setFreight(value);
    }

    const handleInputCepChange = (e) => {
        const { value } = e.target;
        setInputAddress(value);
    };

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
                            {products.map((data, index) => {
                                return (
                                    <span className="products-cart-info">
                                        <img className="cart-image" src={data.file} alt="Produto no carrinho" />
                                        <span className="products-description">
                                            <h2 className="product-title">{data.brand}</h2>
                                            <p style={{ "fontSize": "22px", "color": "black", "marginBottom": "7%" }}>{data.nameProduct} </p>
                                            <section className="infos">
                                                <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>R$ </span> {data.cost} </p>
                                                <section className="input-define-quantity">
                                                    <input
                                                        type="number"
                                                        name={index}
                                                        placeholder="Defina a quantidade deste produto"
                                                        style={{ width: "70px" }}
                                                        value={data.quantity}
                                                        onChange={handleInputQuantityChange}
                                                    />
                                                </section>
                                            </section>
                                        </span>
                                    </span>
                                );
                            })}
                        </section>
                        <section className="cart-products-info">
                            <span className="short-desc-product-info">Informações de endereço da entrega: </span>
                            {address != null ?
                                <>
                                    <span className="total-products">
                                        <p style={{ fontSize: "24px" }}>{address.streetName}</p>
                                        <p style={{ fontSize: "24px" }}>{address.number}</p>
                                        <p style={{ fontSize: "24px" }}>{address.complement}</p>
                                        <p style={{ fontSize: "24px" }}>{address.district}</p>
                                        <p style={{ fontSize: "24px" }}>{address.city}</p>
                                        <p style={{ fontSize: "24px" }}>{address.uf}</p>
                                        <p style={{ fontSize: "24px" }}>{address.cep}</p>
                                    </span>
                                </> : <></>
                            }
                            <hr />
                            <span className="cart-sub-total">
                                <p><b>Sub-Total: </b></p>
                                <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice + Calculator(freight)} </p>
                            </span>
                        </section>
                    </main>
            }
        </>
    );

}

export default ProductCart;