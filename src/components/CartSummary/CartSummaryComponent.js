import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calculator from "../../utils/CalculateFreight";
import "./CartSummaryComponent.css";

function CartSummaryComponent(props) {
    const {
        orders,
        productsPrice,
        status,
        typeSection,
        products,
        totalPrice,
        link,
        buttonValue,
        id
    } = props;
    let { freight } = props;
    let productCart = localStorage.getItem('cart');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [cartFreight, setCartFreight] = useState("");
    const [address, setAddress] = useState({});
    const [inputAddress, setInputAddress] = useState("");
    const [inputNumber, setInputNumber] = useState("");
    const [inputComplement, setInputComplement] = useState("");
    const [showAddressUser, setShowAddressesUser] = useState(userInfo != null ? false : true);
    const [showInputCep, setShowInputCep] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (typeSection === 'cart') {
            getAddresses();
            setCartFreight(JSON.parse(productCart).freight);
        }
    }, []);


    const handleSearchCEP = async (value) => {
        const result = await fetch(`https://viacep.com.br/ws/${value}/json/`);

        if (result.status === 200) {
            const jsonResponse = await result.json();

            if (jsonResponse.erro) {
                alert("CEP não encontrado, por favor revise o CEP enviado para consulta!");
                return;
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
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(productCart));
        } else {
            alert("CEP não encontrado, por favor revise o CEP enviado para consulta!");
        }
    }

    const handleChangeCartAddress = (key, value) => {
        productCart = JSON.parse(productCart);
        address[key] = value;
        productCart["address"] = address;
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(productCart));
    }

    const handleInputCepChange = (e) => {
        const { value, name } = e.target;
        // eslint-disable-next-line default-case
        switch (name) {
            case "complement":
                setInputComplement(value);
                break;
            case "number":
                setInputNumber(value);
                break;
            case "cep":
                setInputAddress(value);
                break;
        }

        if (name !== "cep") {
            handleChangeCartAddress(name, value);
        }
        
    };

    const handleSearchAddressToUser = async () => {

        if (userInfo != null && showAddressUser) {
            const response = await fetch(`https://backend-evd-api.herokuapp.com/backoffice/user/address?id=${userInfo.idUser}`);

            if (response.status === 200) {
                response.json().then(res => {
                    setAddress(res);
                    let cart = productCart;
                    cart = JSON.parse(cart);
                    cart["address"] = res;
                    localStorage.removeItem('cart');
                    localStorage.setItem('cart', JSON.stringify(cart));
                })
            }

            setShowAddressesUser(false);
        } else {
            alert("Endereço já selecionado");
        }
    }

    const handleChangeRadioButton = (value, idAddress) => {
        let cart = JSON.parse(productCart);
        localStorage.removeItem('cart');
        cart = { ...cart, freight: value };
        cart = { ...cart, address: address };
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartFreight(value);
    }

    const getAddresses = async () => {
        if (userInfo && !productCart.address) {
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
    }

    const handleNavigate = () => {
        if (!address.number) {
            alert("Campo número é obrigatório, favor preencher!")
        } else {
            if (userInfo !== null) {
                navigate(link);
            } else {
                navigate("/user");
            }
        }
    }

    const handleSelectChange = async (e) => {
        const { value } = e.target;

        const json = {
            idUser: userInfo.idUser,
            status: value
        }

        const response = await fetch(
            'https://backend-evd-api.herokuapp.com/products/order/update?id=' + id,
            {
                method: 'PUT',
                body: JSON.stringify(json),
                headers: {
                    'Content-type': 'application/json',
                }
            });

        if (response.status === 200) {
            alert("Pedido alterado com sucesso para: " + value);
            window.location.reload();
        } else {
            alert("Erro ao alterar pedido, tente novamente mais tarde");
        }
    }

    return (
        <section className="cart-products-info">
            <span className="short-desc-product-info">Resumo do carrinho: </span>
            {
                typeSection === "cart" ?
                    <>
                        <span className="total-products">
                            <p style={{ fontSize: "24px" }}>{products.length} produtos</p>
                            <p style={{ fontSize: "24px" }}>R$ {productsPrice}</p>
                        </span>
                        {address != null ?
                            <>
                                <span className="total-products">
                                    <p style={{ fontSize: "24px" }}>
                                        {
                                            address.streetName
                                        }
                                    </p>
                                    <p style={{ fontSize: "24px" }}>R$ {Calculator(cartFreight)}</p>
                                </span>
                            </> : <></>
                        }
                        <hr />
                        <span className="cart-sub-total">
                            <p><b>Sub-Total: </b></p>
                            <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice + Calculator(cartFreight)} </p>
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
                                                                checked={cartFreight === "Sedex"}
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
                                                                checked={cartFreight === "Feedex"}
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
                                                                checked={cartFreight === "Loggi"}
                                                            />
                                                        </label>
                                                    </section>
                                                </>
                                                : <> </>
                                        }
                                    </> : <> </>
                            }
                            <button className="btn-search-address" onClick={() => handleSearchAddressToUser()}>
                                Escolher um endereço cadastrado
                            </button>
                            <button className="btn-calculate-freight" onClick={() => setShowInputCep(!showInputCep)}>
                                Adicionar endereço para frete
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
                                            <span style={{ display: "flex", flexDirection: "row" }}>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    placeholder="Número"
                                                    maxLength={5}
                                                    value={inputNumber || ''}
                                                    onChange={handleInputCepChange}
                                                    style={{ width: "100px" }}
                                                />
                                                <input
                                                    type="text"
                                                    name="complement"
                                                    placeholder="Complemento"
                                                    maxLength={100}
                                                    value={inputComplement || ''}
                                                    onChange={handleInputCepChange}
                                                    style={{ width: "200px" }}
                                                />
                                            </span>
                                        </label>
                                    </>
                                    : <></>
                            }
                        </section>
                        <br />
                        <button className="btn-continue-buy" onClick={() => handleNavigate()}>{buttonValue}</button>
                    </>
                    : <>
                        <p style={{ fontSize: "24px", color: "black" }}>Número do pedido: {orders[0].idSale}</p>
                        <span className="total-products">
                            <p style={{ fontSize: "24px" }}>{orders.length} produtos</p>
                            <p style={{ fontSize: "24px" }}>R$ {productsPrice}</p>
                        </span>
                        <span className="total-products">
                            <p style={{ fontSize: "24px" }}>Valor do frete ({orders[0].freight || 'Sedex'}): </p>
                            <p style={{ fontSize: "24px" }}>R$ {freight}</p>
                        </span>
                        <span className="total-products">
                            <p style={{ fontSize: "14px" }}>Endereço de entrega: {orders[0].saleAddress}</p>
                            {
                                userInfo != null && userInfo.userType !== "CLIENTE" ?
                                    <>
                                        <label>
                                            Status:
                                            <br />
                                            <select name="typeId" value={status} onChange={handleSelectChange}>
                                                <option value={"ENTREGUE"}>Entregue</option>
                                                <option value={"EM ANÁLISE"}>Em análise</option>
                                                <option value={"COM A TRANSPORTADORA"}>Com a transportadora</option>
                                                <option value={"AGUARDANDO EMISSAO"}>Aguardando Emissão</option>
                                                <option value={"AGUARDANDO PAGAMENTO"}>Aguardando Pagamento</option>
                                            </select>
                                        </label>
                                    </>
                                    : <>
                                        <p style={{ fontSize: "14px", color: "green" }}>{orders[0].status}</p>
                                    </>
                            }
                        </span>
                        <hr />
                        <span className="cart-sub-total">
                            <p><b>Método de pagamento: </b></p>
                            <p style={{ color: "green", fontSize: "20px" }}>{orders[0].paymentMethod} </p>
                        </span>
                        <span className="cart-sub-total">
                            <p><b>Total: </b></p>
                            <p style={{ color: "green", fontSize: "24px" }}>R$ {orders[0].price} </p>
                        </span>
                        <br />
                        <button className="btn-continue-buy" onClick={() => navigate('/')}>Voltar</button>
                    </>
            }
        </section>
    );
}

export default CartSummaryComponent;