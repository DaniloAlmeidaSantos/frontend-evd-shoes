import React, { useEffect } from 'react';
import './UserListScreen.css';
import { useLocation } from 'react-router-dom';

function UserListScreen() {
    const location = useLocation();
    console.log(location.state);

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const result = await fetch('https://backend-evd-api.herokuapp.com/backoffice/userlist');
        const getResults = await result.json();
        setData(getResults);
    }

    /*
    {dataServices.map((index) => {
        return (
            <tr>
                <td>{index.username}</td>
                <td>{index.email}</td>
                <td>{index.tipousu}</td>
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
                    <button class="botao-editar"><span>Editar</span></button>
                </td>
            </tr>
        );
      })}
    */

    return (
        <body>
            <section class="top-header">
                <div class="subtop-header">
                    <h1>Lista de usuários</h1>
                </div>
                <div class="subtop-header">
                    <button class="btn">Cadastrar usuário</button>
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
            </table>
        </body>
    );
}

export default UserListScreen;