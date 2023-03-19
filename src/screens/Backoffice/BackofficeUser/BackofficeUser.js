import React, { useState, useEffect } from "react";
import "./BackofficeUser.css";
import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

var isFirstReq = false;

function BackofficeUser() {
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState({});
    const [oldPassword, setOldPassword] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const getUserForm = async () => {
        let response = await fetch(
            'https://backend-evd-api.herokuapp.com/backoffice/user?id=' + id,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        )

        if (response.status === 200) {
            response.json().then(resp => {
                resp['repeatPassword'] = resp.password;
                setFormValues(resp)
                const typeUser = resp.userType;
                setUserType(typeUser);
                setOldPassword(resp.password);
            })
        } else {
            alert('Erro ao autenticar: Credenciais incorretas, ou usuário inativo. Valide com o administrador do sistema');
        }

        setLoading(false);
    }

    if (!isFirstReq && id != null) {
        setLoading(true);
        isFirstReq = true;
        getUserForm();

    }

    const handleSubmit = async (e) => {
        setLoading(true);
        let response = null;
        if (formValues.password === formValues.repeatPassword) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            const request = {
                'idUser': id,
                'username': data.username,
                'cpf': data.cpf,
                'email': data.email !== null ? data.email : null,
                'password': data.password,
                'isNewPassword': oldPassword === data.password,
                'userType': {
                    'typeId': data.typeId
                }
            }

            if (id != null) {
                response = await fetch(
                    'https://backend-evd-api.herokuapp.com/backoffice/user/update',
                    {
                        method: 'PUT',
                        body: JSON.stringify(request),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    }
                )
            } else {
                response = await fetch(
                    'https://backend-evd-api.herokuapp.com/backoffice/user/register',
                    {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: {
                            'Content-type': 'application/json',
                        }
                    }
                )
            }

            if (response.status === 200 || response.status === 201) {
                response.json().then(resp => {
                    setLoading(false);
                    navigate('/backoffice/users/list')
                })
                alert("Sucesso na inclusão do usuário!");
            } else {
                alert('Erro ao cadastrar / atualizar usuário, favor tente novamente mais tarde!');
            }
        } else {
            alert('As senhas não se coincidem, favor repita novamente a senha!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setUserType({
            [name]: Number.parseInt(value)
        });
        formValues["userType"] = { [name]: Number.parseInt(value) };
    }

    return (
        <main>
            {loading ?
                (
                    <div className='container-spinner'>
                        <ClipLoader color={'#000'} size={150} />
                    </div>
                ) :
                <>
                    <form onSubmit={handleSubmit}>
                        <h1>Cadastro</h1>
                        <label for="username">Nome:
                            <input type="text" id="username" name="username" onChange={handleInputChange} value={formValues.username || ''} required maxLength={100} />
                        </label>
                        {id == null ?
                            <>
                                <label for="email">Email:
                                    <input type="email" id="email" name="email" required maxLength={120} />
                                </label>
                            </> : <></>
                        }

                        <label for="cpf">CPF:
                            <input type="text" id="cpf" name="cpf" onChange={handleInputChange} value={formValues.cpf || ''} required maxLength={11} />
                        </label>
                        <label for="password">Senha:
                            <input type="password" id="password" name="password" onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
                        </label>
                        <label for="repeatPassword">Confirmar senha:
                            <input type="password" id="repeatPassword" name="repeatPassword" onChange={handleInputChange} value={formValues.repeatPassword || ''} required maxLength={16} />
                        </label>
                        <label>
                            Categoria:
                            <select name="typeId" value={userType.typeId || 0} onChange={handleSelectChange}>
                                <option value={1}>Administrador</option>
                                <option value={2}>Estoquista</option>
                            </select>
                        </label>

                        <div class="btnRegister">
                            <input type="submit" value="Cadastrar" />
                        </div>
                    </form>
                </>
            }
        </main>
    );
}

export default BackofficeUser;