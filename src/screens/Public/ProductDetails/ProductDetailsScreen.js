import React from "react";
import "./ProductDetails.css"

function ProductDetailsScreen() {


    return (
        <>
            <main>
                <h1 class="titulo">TÊNIS DA EVD SHOES</h1>
                <subtitulo>Realce seu estilo aderindo um calçado da EVD SHOES. A EVD reuniu uma coleção online com o melhores tênis do
                    mundo, em uma só plataforma online.</subtitulo>
                <div class="product-info">
                    <ul>
                        <li>
                            Marca
                            <div class="dropdown">
                                <select>
                                    <option value="NIKE">Nike</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            Localização da peça
                            <div class="dropdown">
                                <select>
                                    <option value="Nacional">Nacional</option>
                                    <option value="Internacional">Internacional</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            Tamanho
                            <div class="dropdown">
                                <select>
                                    <option value="">38</option>
                                    <option value="39">39</option>
                                </select>
                            </div>
                        </li>
                        <li>Detalhes
                            <div class="dropdown">
                                <select>
                                    <option value="">Cano alto</option>
                                    <option value="Esportivo">Esportivo</option>
                                    <option value="Social">Social</option>
                                    <option value="Skate">Skate</option>
                                </select>

                                <div class="dropdown">
                                    <button class="dropbtn">Selecionar por cor </button>
                                    <div class="dropdown-content">
                                        <a href="#"><span class="color-icon blue"></span>Azul</a>
                                        <a href="#"><span class="color-icon red"></span>Vermelho</a>
                                        <a href="#"><span class="color-icon purple"></span>Roxo</a>
                                        <a href="#"><span class="color-icon rainbow"></span>Colorido</a>
                                        <a href="#"><span class="color-icon yellow"></span>Amarelo</a>
                                        <a href="#"><span class="color-icon white"></span>Branco</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="product-images">
                    <figure>
                        <img src="" alt="Descrição da imagem X" />
                        <figcaption> Puma disk </figcaption>
                        <figdetails>Tênis modelo maloca Hi Star Totteham </figdetails>
                        <p>
                            <productvalues> R$1000</productvalues><br />
                            <productvalues> 10 x R$ 100</productvalues>
                        </p>

                    </figure>
                    <figure>
                        <img src="" alt="Descrição da imagem Y" />
                        <figcaption>Nike Vapormax</figcaption>
                        <figdetails>Modelo original gangster </figdetails>
                        <p>
                            <productvalues> R$1500</productvalues><br />
                            <productvalues> 10 x R$ 150</productvalues>
                        </p>
                    </figure>
                    <figure>
                        <img src="" alt="Descrição da imagem Z" />
                        <figcaption>Dolce Gabana</figcaption>
                        <figdetails>Modelo Deluxe Oficial player</figdetails>
                        <p>
                            <productvalues> R$10000</productvalues><br />
                            <productvalues> 10 x R$ 10000</productvalues>
                        </p>
                    </figure>
                </div>

            </main>


        </>

    )
}

export default ProductDetailsScreen;

