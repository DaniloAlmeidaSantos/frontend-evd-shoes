import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import AddressModal from '../../../components/Modal/Address/AddressModal';
import validateCPFUtils from '../../../utils/ValidateCpfUtils';
import greetingMessage from '../../../utils/HoursUtils'

import { useParams, useNavigate } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './UserEdit.css';

function UserEdit() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [indexDeliveryAddress, setIndexDeliveryAddress] = useState(0);
  const [indexInvoiceAddress, setIndexInvoiceAddress] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getUserForm();
  }, []);

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
        resp['confirmPassword'] = resp.password;
        setFormValues(resp);
        if (resp.addresses) {
          setAddresses(resp.addresses);
        }
      });
    } else {
      alert('Erro ao autenticar: Credenciais incorretas, ou usuário inativo. Valide com o administrador do sistema');
    }

    setLoading(false);
  }


  const handleSubmitEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!validateCPFUtils(data.cpf)) {
      setLoading(false);
      alert("CPF inválido!");
      return;
    }

    if (addresses.length === 0) {
      setLoading(false);
      alert("É obrigatório adicionar ao menos um endereço!");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setLoading(false);
      alert("As senhas não se coincidem!");
      return;
    }

    addresses.filter((data, index) => {
      if (index === indexInvoiceAddress) {
        data["invoiceAddress"] = "S";
      }
    });

    addresses.filter((data, index) => {
      if (index === indexDeliveryAddress) {
        data["deliveryAddress"] = "S";
      }
    });

    const userType = {
      typeId: "3"
    }

    data["addresses"] = addresses;
    data["userType"] = userType;

    let response = await fetch(
      'https://backend-evd-api.herokuapp.com/user/update',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      setFormValues({});
    } else {
      alert('Erro ao realizar cadastro, tente novamente mais tarde.');
    }

    setLoading(false);

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    formValues["genre"] = value;
  }

  const handleRemoveAddress = async (index) => {
    const addressList = formValues.addresses;
    if (addressList && addressList[index].idAddress) {

      const response = await fetch(
        'https://backend-evd-api.herokuapp.com/user/address/status',
        {
          method: 'PUT',
          body: JSON.stringify(
            {
              idAddress: addressList[index].idAddress,
              status: 'INATIVO'
            }
          ),
          headers: {
            'Content-type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        alert("Endereço excluído com sucesso!");
        return;
      }
    }

    // setAddresses(addresses.splice(--index, 1));
  }

  return (
    <main class="container-login">
      {!loading ?
        <form onSubmit={handleSubmitEdit} style={{ maxWidth: "800px" }}>

          <h1 className="greeting-message" style={{ color: "red" }}>{greetingMessage()}</h1>
          <h3 className="sub-title-user-edit">Edite suas informações pessoais</h3>
          <br />
          <div className="form-register-user">
            <div className='register-1st-column'>
              <label style={{ textAlign: "left", width: "100%" }}>
                Nome completo:
              </label>
              <input class="input" name="username" type="text" placeholder="Nome completo" onChange={handleInputChange} value={formValues.username || ''} required maxLength={160} />
              <label class="label-age">
                Data de nascimento:
              </label>
              <input class="input" type="date" placeholder="Data de nascimento" name="dateOfBirth" onChange={handleInputChange} style={{ textAlign: "left" }} value={formValues.dateOfBirth || ''} required />
              <label style={{ textAlign: "left", width: "100%" }}>
                Senha:
              </label>
              <input class="input" name="password" type="password" placeholder="Senha" onChange={handleInputChange} value={formValues.password || ''} required maxLength={16} />
              <label style={{ textAlign: "left", width: "100%" }}>
                Confirmar senha:
              </label>
              <input class="input" name="confirmPassword" type="password" placeholder="Confirme a senha" onChange={handleInputChange} value={formValues.confirmPassword || ''} required maxLength={16} />
              <label style={{ textAlign: "left", width: "100%" }}>
                Gênero:
                <br />
                <select name="genre" onChange={handleSelectChange} value={formValues.genre || ''} className="select-genre" style={{ width: "100%" }} required>
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
                        <h4><b>{data.streetName}</b></h4>
                        <p>{data.cep}</p>
                      </div>
                      <div className='icon-trash-register-user'>
                        <label style={{ fontSize: "12px", width: "70px", textAlign: "center" }}>
                          Endereço de entrega?
                          <br />
                          <input
                            name="deliveryAddress"
                            id="on"
                            type='radio'
                            checked={indexDeliveryAddress === index}
                            onChange={() => setIndexDeliveryAddress(index)}
                          />
                        </label>
                        <label style={{ fontSize: "12px", width: "70px", textAlign: "center", marginLeft: "10px" }}>
                          Endereço de fatura?
                          <br />
                          <input
                            name="invoiceAddress"
                            id="on"
                            type='radio'
                            checked={indexInvoiceAddress === index}
                            onChange={() => setIndexInvoiceAddress(index)}
                          />
                        </label>
                        <span style={{ backgroundColor: "white" }} onClick={() => handleRemoveAddress(index)}>
                          <label style={{ fontSize: "12px", textAlign: "center" }}>
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

          <input className="btn-register" style={{ "margin-bottom": "5%" }} type="submit" value="Finalizar alteração" />
        </form>
        : (
          <div className='container-spinner'>
            <ClipLoader color={'#000'} size={150} />
          </div>
        )
      }
    </main>
  );
}

export default UserEdit;
