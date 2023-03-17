/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './UserListScreen.css';
import { useLocation } from 'react-router-dom';

function UserListScreen() {
    const location = useLocation();
    const [increment, setIncrement] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const result = await fetch('https://backend-evd-api.herokuapp.com/backoffice/user/list');
        const getResults = await result.json();
        setData(getResults);
    }

    const handleSubmit = async () => {
        console.log("onClick funcionou")
    }

    return (
        <body>
            <section class="top-header">
                <div class="subtop-header">
                    <h1>Lista de usuários</h1>
                </div>
                <div class="subtop-header">
                    <a href="/backoffice/user/register" class="btn">Cadastrar usuário</a>
                </div>
            </section>
            <table >
                <tr>
                    <th>Nome do usuário</th>
                    <th>E-mail</th>
                    <th>Grupo</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                {data.map((data, index) => {
                    return (
                        <tr>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.userType.groupName}</td>
                            <td class="group-radio">
                                <label class="status-lbl">
                                    Ativo
                                    <input type="radio" name={`status-${index}`} id="on" value="A" checked={data.status === "A"} onClick={handleSubmit}/>
                                </label>

                                <label class="status-lbl">
                                    Inativo
                                    <input type="radio" name={`status-${index}`} id="off" value="I" checked={data.status === "I"} />
                                </label>
                            </td>
                            <td>
                                <a href={`/backoffice/user/register/${data.idUser}`} class="botao-editar"><span>Editar</span></a>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </body>
    );
}

export default UserListScreen;