import React from "react";
import logo from "../../media/images/logo.jpeg"
import "./HeaderComponent.css";
import { useNavigate } from 'react-router-dom';


/* eslint-disable jsx-a11y/alt-text */
function HeaderComponent() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogOut = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }

    return (
        <div class="header">
            <nav>
                <img src={logo} class="logo" />
                <ul class="nav-links">
                    <li><a href="/home-backoffice">Páginal Inicial</a></li>
                    <li><a href="/home-backoffice">Produtos</a></li>
                    <li><a href="/home-backoffice">Contato</a></li>
                    {userInfo != null && userInfo.userType !== "Cliente" ?
                        <li><a href="/home-backoffice">Backoffice</a></li>
                        : <> </>
                    }

                    {userInfo == null ?
                        <>
                            <li><a href="/">Acessar</a></li>
                            <li class="btn">Cadastrar</li>
                        </>
                        : <>
                            <li class="btn" onClick={handleLogOut}>Sair</li>
                        </>
                    }

                </ul>
            </nav>
        </div>
    );
}

export default HeaderComponent;