import React, { useState, useEffect } from "react";
import './ProductCart.css';
import ClipLoader from 'react-spinners/ClipLoader';
import CartSummaryComponent from "../../../components/CartSummary/CartSummaryComponent";

function ProductCart() {
    let productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);
    const [address, setAddress] = useState({});
    const [freight, setFreight] = useState(JSON.parse(productCart).freight);
    const [idAddressDefault, setIdAddressDefault] = useState(0);


    useEffect(() => {
        getProducts();
        getAddresses();
    }, []);

    function removeItem(index) {
        let newProducts = JSON.parse(productCart).products;
        newProducts.splice(index, 1);

        setProducts(newProducts);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify({ products: newProducts, freight: freight, address: idAddressDefault }));
        window.location.reload(true);
    }

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

    const handleInputQuantityChange = (e) => {
        const { name, value } = e.target;
        let product = JSON.parse(productCart).products[name];
        let newObject = JSON.parse(productCart).products;

        newObject.splice(name, 1);
        product.quantity = parseInt(value);
        newObject.push(product);

        setProducts(newObject);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify({ products: newObject, freight: freight, address: address }));
        window.location.reload(true);
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
                        <CartSummaryComponent
                            totalPrice={totalPrice}
                            productsPrice={totalProductsCost}
                            products={products}
                            typeSection={"cart"}
                            link={"/sale/details"}
                            buttonValue={"Ir para pagamento"}
                        />
                    </main>
            }
        </>
    );

}

export default ProductCart;