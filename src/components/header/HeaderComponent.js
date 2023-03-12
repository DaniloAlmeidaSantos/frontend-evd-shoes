import React from "react";
import logo from "../../media/images/logo.jpeg"
import "./HeaderComponent.css";
import { useLocation } from 'react-router-dom';


/* eslint-disable jsx-a11y/alt-text */
function HeaderComponent() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div class="header">
            <nav>
                <img src={logo} class="logo" />
                <ul class="nav-links">
                    <li><a href="/home-backoffice">Páginal Inicial</a></li>
                    <li><a href="/home-backoffice">Produtos</a></li>
                    <li><a href="/home-backoffice">Contato</a></li>
                    {location.state != null && location.state.userType != "Cliente" ?
                        <li><a href="/home-backoffice">Backoffice</a></li>
                        : <> </>
                    }

                    {location.state == null ?
                        <>
                            <li><a href="/">Acessar</a></li>
                            <li class="btn">Cadastrar</li>
                        </>
                        : <> </>
                    }

                </ul>
            </nav>
        </div>
    );
}

export default HeaderComponent;