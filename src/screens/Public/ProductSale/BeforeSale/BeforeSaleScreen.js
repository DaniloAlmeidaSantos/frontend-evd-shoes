import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function BeforeSaleScreen() {
    let productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState({});


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
                }
            });
        }
    }

    const handleFreight = (value) => {
        let cart = JSON.parse(productCart);
        localStorage.removeItem('cart');
        cart = { ...cart, freight: value };
        localStorage.setItem('cart', JSON.stringify(cart));
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

                        <section classname="cart-products-section">
                            <span classname="short-desc-product-info">Informações de usuário</span>
                            <span className="total-products">
                                        <p style={{ fontSize: "24px" }}>{userInfo.name}</p>
                                        <p style={{ fontSize: "24px" }}>{userInfo.email}</p>
                                    </span>
                        </section>

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
                                <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice + handleFreight} </p>
                            </span>
                        </section>
                    </main>
            }
        </>
    );

}

export default BeforeSaleScreen;