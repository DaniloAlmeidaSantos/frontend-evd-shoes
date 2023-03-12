import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <main class="container">
      <section class="bloco">
        <div class="titulo-centro">
          <div class="imgem-texto">
            <h1>EVD Shoes</h1>
          </div>
          <div class="imagem-texto">
          </div>
          <p>realize dreams</p>
        </div>
      </section>

      <section class="bloco">
        <form class="formulario" onSubmit={handleSubmit}>
          <div class="sessao-input">
            <input class="input" name="email" type="email" placeholder="E-mail" onChange={handleInputChange} value={formValues.email || ''} required maxLength={120} />
          </div>
          <div class="sessao-input">
            <input class="input" name="password" type="password" placeholder="Senha" onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
          </div>
          <div class="bloco-botao">
            <input type="submit" value="Acessar" class="botao" />
            <input type="submit" value="Cadastrar" class="botao" />
          </div>
          <a href="" target="_blank">esqueci minha senha</a>
        </form>
      </section>
    </main>
  );
}

export default Login;
