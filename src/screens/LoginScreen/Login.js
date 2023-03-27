import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../media/images/logo.svg";
import ClipLoader from 'react-spinners/ClipLoader';

function Login() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    let response = await fetch(
      'https://backend-evd-api.herokuapp.com/backoffice/user/login',
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
        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(resp))
        navigate('/home-backoffice');
      })
    } else {
      alert('Erro ao autenticar: Credenciais incorretas, ou usuário inativo. Valide com o administrador do sistema');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <main class="container-login">
      <img src={logo} alt='Logo da empresa EVD Shoes, nela representa um tênis preto com detalhes em branco com o nome da empresa abaixo do tênis.' />
      <form onSubmit={handleSubmit}>
        <h1> Login </h1>
        <div >
          <input class="input" name="email" type="email" placeholder="E-mail" onChange={handleInputChange} value={formValues.email || ''} required maxLength={120} />
        </div>
        <div>
          <input class="input" name="password" type="password" placeholder="Senha" onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
        </div>
        {!loading ?
          <> </> : (
            <div className='container-spinner'>
              <ClipLoader color={'#000'} size={150} />
            </div>
          )
        }
        <input style={{ "margin-bottom": "5%" }} type="submit" value="Acessar" />
        <input type="submit" value="Cadastrar" />
      </form>
    </main>
  );
}

export default Login;
