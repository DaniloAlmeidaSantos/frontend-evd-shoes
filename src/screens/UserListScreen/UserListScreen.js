import './UserListScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UserListScreen() {
    return (
        <body>
            <main class="bloco">
                <div>
                    <h1>Lista de usuários</h1>
                </div>
                <div class="bloco-botao">
                    <button class="botao">Cadastrar usuário</button>
                </div>
            </main>
            <section>
                <table>
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
            </section>
        </body>
    );
}

export default UserListScreen;