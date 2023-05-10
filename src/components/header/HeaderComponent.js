import React from "react";
import logo from "../../media/images/logo.jpeg"
import "./HeaderComponent.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCartShopping } from "@fortawesome/free-solid-svg-icons";


/* eslint-disable jsx-a11y/alt-text */
function HeaderComponent() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogOut = () => {
        localStorage.removeItem('userInfo');
        navigate('/user');
    }

    return (
        <div class="header">
            <nav>
                <img src={logo} class="logo" />
                <ul class="nav-links">
                    <li><a href="/">Páginal Inicial</a></li>
                    <li><a href="/">Produtos</a></li>
                    <li><a href="/home-backoffice">Contato</a></li>
                    {userInfo != null && userInfo.userType !== "CLIENTE" ?
                        <li><a href="/home-backoffice">Backoffice</a></li>
                        : <> </>
                    }
                    {userInfo == null ?
                        <>
                            <li><a href="/user">Acessar</a></li>
                            <li class="btn">Cadastrar</li>
                        </>
                        : <></>
                    }

                    <li>
                        <a href={`/user/edit/`}>
                            <p className="count-items-cart">2</p>
                            <FontAwesomeIcon size="2x" icon={faCartShopping} className="plus-cart" />
                        </a>
                    </li>

                    {userInfo != null ?
                        <>
                            <li>
                                <a href={`/user/edit/${userInfo.idUser}`}>
                                    <FontAwesomeIcon size="2x" icon={faUserCircle} className="plus-cart" />
                                </a>
                            </li>
                            <li class="btn" onClick={handleLogOut}>Sair</li>
                        </> : <> </>
                    }
                </ul>
            </nav>
        </div>
    );
}

export default HeaderComponent;