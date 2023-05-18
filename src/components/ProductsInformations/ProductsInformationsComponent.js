// import React from "react";

// function ProductsInformationsComponent(props) {

//     const handleNavigate = () => {
//         if (userInfo !== null) {
//             navigate("/sale/details");
//         } else {
//             navigate("/user");
//         }
//     }

//     const handleChangeRadioButton = (value, idAddress) => {
//         let cart = JSON.parse(productCart);
//         localStorage.removeItem('cart');
//         cart = { ...cart, freight: value };
//         cart = { ...cart, address: idAddress };
//         localStorage.setItem('cart', JSON.stringify(cart));
//         setFreight(value);
//     }

//     return (
//         <section className="cart-products-info">
//             <span className="short-desc-product-info">Resumo do carrinho: </span>
//             <span className="total-products">
//                 <p style={{ fontSize: "24px" }}>{products.length} produtos</p>
//                 <p style={{ fontSize: "24px" }}>R$ {totalProductsCost}</p>
//             </span>
//             {freight != null ?
//                 <>
//                     <span className="total-products">
//                         <p style={{ fontSize: "24px" }}>{
//                             addresses.map(data => {
//                                 if (data.deliveryAddress === "S") {
//                                     return data.streetName;
//                                 }
//                             })
//                         }</p>
//                         <p style={{ fontSize: "24px" }}>R$ {Calculator(freight)}</p>
//                     </span>
//                 </> : <></>

//             }
//             <hr />
//             <span className="cart-sub-total">
//                 <p><b>Sub-Total: </b></p>
//                 <p style={{ color: "green", fontSize: "24px" }}>R$ {totalPrice + Calculator(freight)} </p>
//             </span>
//             <br />
//             <section className="calculate-freight-section">
//                 {
//                     userInfo != null ?
//                         <>
//                             <p>Selecione o endereço para calcular frete: </p>
//                             {
//                                 addresses.map((data) => {
//                                     return (
//                                         <>
//                                             {
//                                                 data.deliveryAddress === "S" ?
//                                                     <>
//                                                         <section className="unit-freight">
//                                                             <p>{data.streetName} - {data.cep} </p>
//                                                             <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
//                                                                 Sedex:
//                                                                 <br />
//                                                                 <input
//                                                                     name="freight"
//                                                                     value="Sedex"
//                                                                     type="radio"
//                                                                     onChange={() => handleChangeRadioButton("Sedex", data.idAddress)}
//                                                                     className="off" id="off"
//                                                                     checked={freight === "Sedex"}
//                                                                 />
//                                                             </label>
//                                                             <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
//                                                                 Feedex:
//                                                                 <br />
//                                                                 <input
//                                                                     name="freight"
//                                                                     value="Feedex"
//                                                                     type="radio"
//                                                                     onChange={() => handleChangeRadioButton("Feedex", data.idAddress)}
//                                                                     className="off" id="off"
//                                                                     checked={freight === "Feedex"}
//                                                                 />
//                                                             </label>
//                                                             <label style={{ fontSize: "16px", width: "70px", textAlign: "center" }}>
//                                                                 Loggi:
//                                                                 <br />
//                                                                 <input
//                                                                     name="freight"
//                                                                     value="Loggi"
//                                                                     type="radio"
//                                                                     onChange={() => handleChangeRadioButton("Loggi", data.idAddress)}
//                                                                     className="off" id="off"
//                                                                     checked={freight === "Loggi"}
//                                                                 />
//                                                             </label>
//                                                         </section>
//                                                     </> : <> </>
//                                             }
//                                         </>
//                                     );
//                                 })
//                             }
//                             <button className="btn-calculate-freight">
//                                 Alterar endereço para frete
//                             </button>
//                         </> : <> </>
//                 }

//             </section>
//             <br />
//             <button className="btn-continue-buy" onClick={() => handleNavigate()}>Continuar</button>
//         </section>
//     );
// }