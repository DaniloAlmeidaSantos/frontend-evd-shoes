import React, { useState, useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function GetOrders() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getProducts();
    }, []);

    const getProducts = async () => {
        const data = await fetch(`http://localhost:8080/products/orders?id=${userInfo.idUser}`);
        const getResults = await data.json();
        if (getResults !== null) {
            setProducts(getResults);
            setLoading(false);
        }
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
                    <>
                        <main className="main-details-products">
                            <h1>Meus Pedidos</h1>
                            <section className="cart-products-section">
                                {products.map((data, index) => {
                                    return (
                                        <span className="products-cart-info">
                                            <img className="cart-image" src={data.file} alt="Produto no carrinho" />
                                            <span className="products-description">
                                                <h2 className="product-title">{data.brand}</h2>
                                                <p style={{ "fontSize": "26px", "color": "black", "marginBottom": "7%" }}>
                                                    <b style={{ "fontSize": "28px" }}>Nome do produto: </b>
                                                    {data.nameProduct}
                                                </p>
                                                <section className="infos">
                                                    <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>Número do pedido: </span> {data.idSale} </p>
                                                    <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>Preço total do pedido: R$ </span> {data.price} </p>
                                                    <p style={{ "fontSize": "24px", color: "black" }}><span style={{ "fontSize": "26px" }}>Unidades vendida: </span> {data.quantity} </p>
                                                    <p style={{ "fontSize": "18px", color: "red" }}><span style={{ "fontSize": "18px" }}>Data da venda: </span> <b>{data.date} </b></p>
                                                    <p style={{ "fontSize": "18px", color: "red" }}><span style={{ "fontSize": "18px" }}>Status do pedido: </span> <b>{data.status} </b></p>
                                                    <a href={`/orders/details/${data.idSale}`}>
                                                        <p style={{"fontSize": "24px", color: "green"}}>Ver detalhes</p>
                                                    </a>
                                                </section>
                                            </span>
                                        </span>
                                    );
                                })}
                            </section>
                        </main>
                    </>
            }
        </>
    );
}

export default GetOrders;

