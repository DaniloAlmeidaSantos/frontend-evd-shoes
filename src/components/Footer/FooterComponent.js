import React from "react";
import "./FooterComponent.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function FooterComponent() {
    const navigate = useNavigate();

    return (
        <div class="footer">
            <nav>
                <ul class="nav-links-footer">
                    <h5>Institucional</h5>
                    <li><a>Sobre a EVD Shoes</a></li>
                    <li><a>Política de privacidade</a></li>
                    <li><a>Trabalhe conosco</a></li>
                </ul>
            </nav>

            <nav>
                <ul class="nav-links-footer">
                    <h5>Ajuda</h5>
                    <li><a>Trocas e devoluções</a></li>
                    <li><a>Entregas</a></li>
                    <li><a>Contato</a></li>
                </ul>
            </nav>

            <nav>
                <ul class="nav-links-footer">
                    <h5>Empresa</h5>
                    <li><a>Sustentabilidade</a></li>
                    <li><a>Seja um revendedor</a></li>
                    <li><a>Soluções corporativas</a></li>
                </ul>
            </nav>

            <nav class="nav-links-footer">
                <h2>Redes sociais</h2>
            </nav>

        </div>
    );
}

export default FooterComponent;