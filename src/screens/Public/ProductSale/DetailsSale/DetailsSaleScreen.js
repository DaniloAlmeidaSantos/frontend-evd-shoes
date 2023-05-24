import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import BuyFlowComponent from "../../../../components/BuyFlow/BuyFlowComponent";
import { useNavigate } from "react-router-dom";
import Calculator from "../../../../utils/CalculateFreight";

function DetailsSaleScreen() {
    let productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProductsCost, setTotalProductsCost] = useState(0);
    const [address, setAddress] = useState({});
    const [showInputCep, setShowInputCep] = useState(false);
    const [showAddressUser, setShowAddressesUser] = useState(true);
    const [freight, setFreight] = useState(JSON.parse(productCart).freight);
    const [inputAddress, setInputAddress] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        getProducts();
        getAddresses();
    }, []);

    const getAddresses = async () => {
        if (userInfo != null && !productCart.address) {
            const response = await fetch(`http://localhost:8080/backoffice/user/address?id=${userInfo.idUser}`);

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
        const response = await fetch('http://localhost:8080/products/cart', {
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

    const handleNavigate = () => {
        if (userInfo !== null) {
            navigate("/sale/payment");
        } else {
            navigate("/user");
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


    const handleSearchCEP = async (value) => {
        const result = await fetch(`https://viacep.com.br/ws/${value}/json/`);

        if (result.status === 200) {
            const jsonResponse = await result.json();

            if (jsonResponse.erro) {
                alert("CEP não encontrado, por favor revise o CEP enviado para consulta!");
            }

            let address = {
                "cep": jsonResponse.cep,
                "streetName": jsonResponse.logradouro,
                "district": jsonResponse.bairro,
                "uf": jsonResponse.uf,
                "city": jsonResponse.localidade
            };

            setAddress(address);
            setShowAddressesUser(true);
            productCart = JSON.parse(productCart);
            productCart["address"] = address;
            console.log(address, productCart);
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(productCart));
        } else {
            alert("CEP não encontrado, por favor revise o CEP enviado para consulta!");
        }

    }

    const handleSearchAddressToUser = async () => {

        if (userInfo != null && showAddressUser) {
            const response = await fetch(`http://localhost:8080/backoffice/user/address?id=${userInfo.idUser}`);

            if (response.status === 200) {
                response.json().then(res => {
                    setAddress(res);
                    let cart = productCart;
                    cart = JSON.parse(cart);
                    cart["address"] = res;
                    console.log(cart)
                    localStorage.removeItem('cart');
                    localStorage.setItem('cart', JSON.stringify(cart));
                })
            }

            setShowAddressesUser(false);
        } else {
            alert("Endereço já selecionado");
        }
    }

    const handleInputCepChange = (e) => {
        const { value } = e.target;
        setInputAddress(value);
    };

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
                                                <p style={{ "fontSize": "24px", color: "green" }}><span style={{ "fontSize": "22px" }}>Unidades: </span> {data.quantity} </p>
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
                            {address != null ?
                                <>
                                    <span className="total-products">
                                        <p style={{ fontSize: "24px" }}>{
                                            address.streetName
                                        }</p>
                                        <p style={{ fontSize: "24px" }}>R$ {Calculator(freight)}</p>
                                    </span>
                                </> : <></>
                            }
                            <hr />
                            <span className="cart-sub-total">
                                <p><b>Sub-Total: </b></p>
                                <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice + Calculator(freight)} </p>
                            </span>
                            <br />
                            <section className="calculate-freight-section">
                                {
                                    address != null ?
                                        <>
                                            <p>Selecione o endereço para calcular frete: </p>
                                            {
                                                address != null ?
                                                    <>
                                                        <section className="unit-freight">
                                                            <p>{address.streetName} - {address.cep} </p>
                                                            <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
                                                                Sedex:
                                                                <br />
                                                                <input
                                                                    name="freight"
                                                                    value="Sedex"
                                                                    type="radio"
                                                                    onChange={() => handleChangeRadioButton("Sedex", address.idAddress)}
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
                                                                    onChange={() => handleChangeRadioButton("Feedex", address.idAddress)}
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
                                                                    onChange={() => handleChangeRadioButton("Loggi", address.idAddress)}
                                                                    className="off" id="off"
                                                                    checked={freight === "Loggi"}
                                                                />
                                                            </label>
                                                        </section>
                                                    </>
                                                    : <> </>
                                            }
                                        </> : <> </>
                                }
                                <button className="btn-calculate-freight" onClick={() => setShowInputCep(!showInputCep)}>
                                    Adicionar endereço para frete
                                </button>
                                <button className="btn-calculate-freight" onClick={() => handleSearchAddressToUser()}>
                                    Escolher um endereço cadastrado
                                </button>
                                {
                                    showInputCep ?
                                        <>
                                            <label>
                                                Digite o seu CEP:<br />
                                                <input type="text" name="cep" maxLength="8" onChange={handleInputCepChange} style={{ width: "200px" }} />
                                                <button className="btn-calculate-freight" onClick={() => handleSearchCEP(inputAddress)}>
                                                    Pesquisar
                                                </button>
                                            </label>
                                        </>
                                        : <></>
                                }
                            </section>
                            <br />
                            <button className="btn-continue-buy" onClick={() => handleNavigate()}>Ir para pagamento</button>
                        </section>
                    </main>
            }
        </>
    );

}

export default DetailsSaleScreen;