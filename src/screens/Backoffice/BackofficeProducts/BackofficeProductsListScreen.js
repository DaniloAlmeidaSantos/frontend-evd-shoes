import React, { useEffect, useState } from 'react';
import './BackofficeProductsListScreen.scss';
import ClipLoader from 'react-spinners/ClipLoader';
import PaginationComponent from '../../../components/Pagination/PaginationComponent';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BackofficeProductsListScreen() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(data.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(0);
        setLoading(true);
        getData();
    }, [])

    async function getData() {
        const result = await fetch('https://backend-evd-api.herokuapp.com/backoffice/products');
        const getResults = await result.json();
        setLoading(false);
        setData(getResults);
    }

    const handleInputChange = async (e) => {
        const value = e.target.value;

        if (value == null) {
            setLoading(true);
            getData();
            return;
        }

        setCurrentPage(0);
        if (value !== '' || value !== undefined) {
            const result = await fetch(`https://backend-evd-api.herokuapp.com/backoffice/products?nameProduct=` + value);
            const getResults = await result.json();
            setData(getResults);
        }

    }

    const handleSubmit = async (e, idProduct) => {
        e.preventDefault();
        // Implements alter status to product
        // eslint-disable-next-line no-restricted-globals
        const responseConfirm = confirm("Você deseja mesmo prosseguir com ativação / inativação deste produto?");

        if (responseConfirm) {
            setLoading(true);
            const json = {
                idProduct: idProduct,
                status: e.target.value
            }

            let response = await fetch(
                'https://backend-evd-api.herokuapp.com/backoffice/products/status',
                {
                    method: 'PUT',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                alert(`Status do produto ${idProduct} atualizado com sucesso!`);
            } else {
                alert('Erro ao atualizar status do produto: ' + idProduct);
            }

            getData();
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
                            <h1>Lista de produtos</h1>
                        </div>
                        <div class="subtop-header">
                            <a href="/backoffice/products/register">
                                <FontAwesomeIcon size="2x" icon={faPlus} className="plus-register" />
                            </a>
                        </div>
                    </section>
                    <input
                        type="search"
                        placeholder='Pesquisar por um produto'
                        onChange={handleInputChange}
                    />
                    <table >
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                        {currentItems.map((data, index) => {
                            return (
                                <tr>
                                    <td>{data.idProduct}</td>
                                    <td>{data.nameProduct}</td>
                                    <td>{data.quantity}</td>
                                    <td>R$ {data.cost}</td>
                                    <td class="group-radio">
                                        <label class="status-lbl">
                                            Ativo
                                            <input
                                                type="radio"
                                                name={`status-${index}`}
                                                id="on"
                                                value="A"
                                                checked={data.status === "A"}
                                                onChange={(e) => handleSubmit(e, data.idProduct)}
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
                                                onChange={(e) => handleSubmit(e, data.idProduct)}
                                            />
                                        </label>
                                    </td>
                                    <td>
                                        <a
                                            href={`/backoffice/products/register/${data.idProduct}`}
                                            className="btn-edit-user-list"
                                            style={{ marginTop: '10px' }}>
                                            <span>Editar</span>
                                        </a>
                                        <a
                                            href={`/sell/product/${data.idProduct}`}
                                            className="btn-edit-user-list"
                                            style={{ marginTop: '10px' }}>
                                            <span>Visualizar</span>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                    <PaginationComponent
                        pages={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            }
        </main>
    );

};

export default BackofficeProductsListScreen;