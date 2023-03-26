/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './UserListScreen.css';
import ClipLoader from 'react-spinners/ClipLoader';

function UserListScreen() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getData();
    }, [])

    async function getData() {
        const result = await fetch('https://backend-evd-api.herokuapp.com/backoffice/user/list');
        const getResults = await result.json();
        setLoading(false);
        setData(getResults);
    }

    const handleSubmit = async (e, idUser) => {
        e.preventDefault();

        // eslint-disable-next-line no-restricted-globals
        const responseConfirm = confirm("Você deseja mesmo prosseguir com ativação / inativação deste usuário?");

        if (responseConfirm) {
            setLoading(true);
            const json = {
                userId: idUser,
                status: e.target.value
            }
    
            let response = await fetch(
                'https://backend-evd-api.herokuapp.com/backoffice/user/update/status',
                {
                    method: 'PUT',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
    
            if (response.status === 200) {
                getData();
                alert(`Status do usuário ${idUser} atualizado com sucesso!`);
            } else {
                alert('Erro ao atualizar status do usuário: ' + idUser);
            }
        }
        
    }

    return (
        <main class="container-user-list">
            {loading ?
                <>
                    <div className='container-spinner'>
                        <ClipLoader color={'#000'} size={150} />
                    </div>
                </> : <>
                    <section class="top-header">
                        <div class="subtop-header">
                            <h1>Lista de usuários</h1>
                        </div>
                        <div class="subtop-header">
                            <a href="/backoffice/user/register" className="btn-register">Cadastrar usuário</a>
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
                                            <input
                                                type="radio"
                                                name={`status-${index}`}
                                                id="on"
                                                value="A"
                                                checked={data.status === "A"}
                                                onChange={(e) => handleSubmit(e, data.idUser)}
                                            />
                                        </label>

                                        <label class="status-lbl">
                                            Inativo
                                            <input
                                                type="radio"
                                                name={`status-${index}`}
                                                id="off"
                                                value="I"
                                                checked={data.status === "I"}
                                                onChange={(e) => handleSubmit(e, data.idUser)}
                                            />
                                        </label>
                                    </td>
                                    <td>
                                        <a href={`/backoffice/user/register/${data.idUser}`} className="btn-edit-user-list"><span>Editar</span></a>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </>
            }
        </main>
    );
}

export default UserListScreen;