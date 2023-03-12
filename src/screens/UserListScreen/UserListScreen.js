import React from 'react';
import './UserListScreen.css';
import { useLocation } from 'react-router-dom';

function UserListScreen() {
    const location = useLocation();
    console.log(location.state);

    return (
        <body class="container">
            <section class="top-header">
                <div>
                    <h1>Lista de usuários</h1>
                </div>
                <button class="btn">Cadastrar usuário</button>
            </section>
            <table >
                <tr class="titulo-tabela">
                    <th>Nome do usuário</th>
                    <th>E-mail</th>
                    <th>Grupo</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                <tr>
                    <td>Nome do usuário</td>
                    <td>E-mail</td>
                    <td>Grupo</td>
                    <td>
                        <label>
                            Ativo
                            <input type="radio" id="on" value="1" />
                        </label>

                        <label>
                            Inativo
                            <input type="radio" id="on" value="1" />
                        </label>
                    </td>
                    <td>
                        <button class="botao-editar"><i class="fa fa-solid fa-pen"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>Nome do usuário</td>
                    <td>E-mail</td>
                    <td>Grupo</td>
                    <td>
                        <input type="radio" id="on" value="1" />on
                        <input type="radio" id="off" value="0" />off
                    </td>
                    <td>
                        <button class="botao-editar"><i class="fa fa-solid fa-pen"></i></button>
                    </td>
                </tr>
                <tr>
                    <td>Nome do usuário</td>
                    <td>E-mail</td>
                    <td>Grupo</td>
                    <td>
                        <input type="radio" id="on" value="1" />
                        <input type="radio" id="off" value="0" />
                    </td>
                    <td>
                        <button class="botao-editar"><i class="fa fa-solid fa-pen"></i></button>
                    </td>
                </tr>
            </table>
        </body>
    );
}

export default UserListScreen;