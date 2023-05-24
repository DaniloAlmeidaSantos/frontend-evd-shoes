import React, { useState, useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function BackOfficeUpdateStatus() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const data = await fetch(`https://backend-evd-api.herokuapp.com/products/orders/stockist`);
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
                            <h1>Pedidos realizados</h1>
                            <section className="cart-products-section">
                                {products.map((data, index) => {
                                    return (
                                        <span className="products-cart-info">
                                            <img className="cart-image" src={data.file} alt="Produto no carrinho" />
                                            <span className="products-description">
                                                <p style={{ "fontSize": "26px", "color": "black", "marginBottom": "7%" }}>
                                                    <b style={{ "fontSize": "28px" }}>Número do pedido: </b>
                                                    {data.idSale}
                                                </p>
                                                <section className="infos">
                                                    <p style={{ "fontSize": "24px" }}><span style={{ "fontSize": "26px" }}>Nome do produto: </span> {data.nameProduct} </p>
                                                    <p style={{ "fontSize": "24px", color: "black" }}><span style={{ "fontSize": "26px" }}>Unidades vendida: </span> {data.quantity} </p>
                                                    <p style={{ "fontSize": "18px", color: "red" }}><span style={{ "fontSize": "18px" }}>Data da venda: </span> <b>{data.date} </b></p>
                                                    <p style={{ "fontSize": "18px", color: "red" }}><span style={{ "fontSize": "18px" }}>Status do pedido: </span> <b>{data.status} </b></p>
                                                    <a href={`/orders/details/${data.idSale}`}>
                                                        <p style={{"fontSize": "24px", color: "green"}}>Ver detalhes / Alterar status</p>
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

export default BackOfficeUpdateStatus;