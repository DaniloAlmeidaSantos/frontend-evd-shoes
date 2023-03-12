import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../media/images/logo.svg";

function Login() {
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    let response = await fetch(
      'http://localhost:8080/backoffice/user/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      response.json().then(resp => {
        navigate('/home-backoffice', { state: resp });
      })
    } else {
      alert('Erro ao autenticar: Credenciais incorretas, ou usuário inativo. Valide com o administrador do sistema');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <main class="container-login">
      <img src={logo} />
      <form onSubmit={handleSubmit}>
        <h1> Login </h1>
        <div >
          <input class="input" name="email" type="email" placeholder="E-mail" onChange={handleInputChange} value={formValues.email || ''} required maxLength={120} />
        </div>
        <div>
          <input class="input" name="password" type="password" placeholder="Senha" onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
        </div>
        <input style={{ "margin-bottom": "5%" }} type="submit" value="Acessar" />
        <input type="submit" value="Cadastrar" />
      </form>
    </main>
  );
}

export default Login;
