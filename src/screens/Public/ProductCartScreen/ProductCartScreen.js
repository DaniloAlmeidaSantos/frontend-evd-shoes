import React, { useState, useEffect } from "react";
import './ProductCart.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from "react-router-dom";


function ProductCart() {
    const productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [freight, setFreight] = useState(JSON.parse(productCart).freight);
    const [ idAddressDefault, setIdAddressDefault ] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        getProducts();
        getAddresses();
    }, []);

    function removeItem(index) {
        let newProducts = JSON.parse(productCart).products;
        newProducts.splice(index, 1);

        setProducts(newProducts);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify({products: newProducts, freight: freight, address: idAddressDefault}));
        window.location.reload(true);
    }

    const getAddresses = async () => {
        if (userInfo != null) {
            const response = await fetch(`https://backend-evd-api.herokuapp.com/backoffice/user/address?id=${userInfo.idUser}`);

            if (response.status === 200) {
                response.json().then(res => {
                    setAddresses(res);
                    for (let address of res) {
                        if (address.deliveryAddress === "S") {
                            setIdAddressDefault(address.idAddress);
                            return;
                        }
                    }
                })
            }
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

    const handleInputQuantityChange = (e) => {
        const { name, value } = e.target;
        let product = JSON.parse(productCart).products[name];
        let newObject = JSON.parse(productCart).products;

        console.log(product, newObject)

        newObject.splice(name, 1);
        product.quantity = parseInt(value);
        newObject.push(product);

        setProducts(newObject);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify({products: newObject, freight: freight, address: idAddressDefault}));
        window.location.reload(true);
    }

    const handleNavigate = () => {
        if (userInfo !== null) {
            navigate("/sale/details");
        } else {
            navigate("/user");
        }
    }

    const handleChangeRadioButton = (value, idAddress) => {
        let cart = JSON.parse(productCart);
        localStorage.removeItem('cart');
        cart = {...cart, freight: value};
        cart = {...cart, address: idAddress};
        localStorage.setItem('cart', JSON.stringify(cart));
        setFreight(value);
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
                                <p><b>Sub-Total: </b></p>
                                <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice} </p>
                            </span>
                            <br />
                            <section className="calculate-freight-section">
                                {
                                    userInfo != null ?
                                        <>
                                            <p>Selecione o endereço para calcular frete: </p>
                                            {
                                                addresses.map((data) => {
                                                    return (
                                                        <>
                                                            {
                                                                data.deliveryAddress === "S" ?
                                                                    <>
                                                                        <section className="unit-freight">
                                                                            <p>{data.streetName} - {data.cep} </p>
                                                                            <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
                                                                                Sedex:
                                                                                <br />
                                                                                <input
                                                                                    name="freight"
                                                                                    value="Sedex"
                                                                                    type="radio"
                                                                                    onChange={() => handleChangeRadioButton("Sedex", data.idAddress)}
                                                                                    className="off" id="off"
                                                                                    checked={freight === "Sedex"}
                                                                                />
                                                                            </label>
                                                                            <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
                                                                                Feedex:
                                                                                <br />
                                                                                <input
                                                                                    name="freight"
                                                                                    value="Feedex"
                                                                                    type="radio"
                                                                                    onChange={() => handleChangeRadioButton("Feedex", data.idAddress)}
                                                                                    className="off" id="off"
                                                                                    checked={freight === "Feedex"}
                                                                                />
                                                                            </label>
                                                                            <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
                                                                                Loggi:
                                                                                <br />
                                                                                <input
                                                                                    name="freight"
                                                                                    value="Loggi"
                                                                                    type="radio"
                                                                                    onChange={() => handleChangeRadioButton("Loggi", data.idAddress)}
                                                                                    className="off" id="off"
                                                                                    checked={freight === "Loggi"}
                                                                                />
                                                                            </label>
                                                                        </section>
                                                                    </> : <> </>
                                                            }
                                                        </>
                                                    );
                                                })
                                            }
                                            <button className="btn-calculate-freight">
                                                Alterar endereço para frete
                                            </button>
                                        </> : <> </>
                                }

                            </section>
                            <br />
                            <button className="btn-continue-buy" onClick={() => handleNavigate()}>Continuar</button>
                        </section>
                    </main>
            }
        </>
    );

}

export default ProductCart;