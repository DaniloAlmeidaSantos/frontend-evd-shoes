import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../media/images/logo.svg";
import ClipLoader from 'react-spinners/ClipLoader';
import AddressModal from '../../components/Modal/Address/AddressModal';
import { faC, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import validateCPFUtils from "../../../utils/ValidateCpfUtils";

function Login() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(0);
  const [invoiceAddress, setInvoiceAddress] = useState(0);
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();


  const handleSubmitLogin = async (e) => {
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
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(value)
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    formValues["genre"] = value;
  }

  const handleRemoveAddress = (index) => {
    const data = addresses;
    data.splice(index, 1);
    console.log(data);
    setAddresses(data);
    console.log(addresses)
  }

  return (
    <main class="container-login">
      <img
        src={logo} alt='Logo da empresa EVD Shoes, nela representa um tênis preto com detalhes em branco com o nome da empresa abaixo do tênis.' />
      <ul className="nav-links">
        <li><span onClick={() => setIsLogin(true)} className={`login-${isLogin ? 'active' : ''}`}>Acessar</span></li>
        <li><span onClick={() => setIsLogin(false)}>Cadastro</span></li>
      </ul>
      {isLogin ?
        <>
          <form onSubmit={handleSubmitLogin}>
            <h1> Acessar </h1>
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
          </form>
        </> :
        <>
          <form onSubmit={handleSubmitLogin} style={{ maxWidth: "800px" }}>
            <h1> Cadastro </h1>
            <div className="form-register-user">
              <div className='register-1st-column'>
                <input class="input" name="username" type="text" placeholder="Nome completo" onChange={handleInputChange} value={formValues.username || ''} required maxLength={160} />
                <input type="text" id="cpf" name="cpf" placeholder="CPF" onChange={handleInputChange} value={formValues.cpf || ''} required maxLength={11} />
                <label class="label-age">
                  Data de nascimento:
                </label>
                <input class="input" type="date" placeholder="Data de nascimento" name="dateOfBirth" onChange={handleInputChange} style={{ textAlign: "left" }} value={formValues.dateOfBirth || ''} required/>
                <input class="input" name="email" type="email" placeholder="E-mail" onChange={handleInputChange} value={formValues.email || ''} required maxLength={120} />
                <input class="input" name="password" type="password" placeholder="Senha" onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
                <input class="input" name="confirmPassword" type="password" placeholder="Confirme a senha" onChange={handleInputChange} value={formValues.confirmPassword || ''} required maxLength={16} />
                <label style={{ textAlign: "left", width: "100%" }}>
                  Gênero:
                  <br />
                  <select name="genre" onChange={handleSelectChange} className="select-genre" style={{ width: "100%" }} required>
                    <option></option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                    <option value="T">Transgênero</option>
                    <option value="O">Outros</option>
                  </select>
                </label>
              </div>
              <span id="vertical-line"></span>
              <div className='register-2nd-column'>
                <h2 className='sub-title' style={{ marginBottom: "10px" }}>Endereços adicionados</h2>
                {addresses.map((data, index) => {
                  return (
                    <>
                      <div class="card">
                        <div class="container-card">
                          <h4><b>{data.street}</b></h4>
                          <p>{data.cep}</p>
                        </div>
                        <div className='icon-trash-register-user'>
                          <label style={{ fontSize: "12px", width: "70px", textAlign: "center" }}>
                            Endereço de entrega?
                            <br />
                            <input type='radio' />
                          </label>
                          <label style={{ fontSize: "12px", width: "70px", textAlign: "center", marginLeft: "10px" }}>
                            Endereço de fatura?
                            <br />
                            <input type='checkbox' />
                          </label>
                          <span style={{ backgroundColor: "white" }} onClick={() => handleRemoveAddress(index)}>
                            <label style={{ fontSize: "10px" }}>
                              Excluir?
                              <br />
                              <FontAwesomeIcon className='btn-icon-trash' size="2x" icon={faTrash} />
                            </label>
                          </span>
                        </div>
                      </div>
                    </>
                  )
                })}
                <span
                  className="btn-add-address"
                  onClick={() => setShowModal(true)}
                >
                  Adicione novo endereço
                </span>
                {showModal ?
                  <>
                    <AddressModal
                      addresses={addresses}
                      show={showModal}
                      onHide={() => setShowModal(false)}
                    />
                  </> : <></>

                }
              </div>
            </div>
            {!loading ?
              <> </> : (
                <div className='container-spinner'>
                  <ClipLoader color={'#000'} size={150} />
                </div>
              )
            }
            <input className="btn-register" style={{ "margin-bottom": "5%" }} type="submit" value="Finalizar cadastro" />
          </form>
        </>
      }

    </main>
  );
}

export default Login;
