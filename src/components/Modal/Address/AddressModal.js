import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AddressModal.css';

function AddressModal(props) {
    let { addresses } = props;
    const [formValues, setFormValues] = useState({});

    console.log(addresses)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSearchPerCEP = async () => {
        const result = await fetch(`https://viacep.com.br/ws/${formValues.cep}/json/`);

        if (result.status === 200) {
            const jsonResponse = await result.json();

            if (jsonResponse.erro) {
                alert("CEP não encontrado, por favor revise o CEP enviado para consulta!");
            }

            let address = {
                "cep": jsonResponse.cep,
                "street": jsonResponse.logradouro,
                "district": jsonResponse.bairro,
                "uf": jsonResponse.uf,
                "city": jsonResponse.localidade
            };

            setFormValues(address);

        } else {
            alert("CEP não encontrado, por favor revise o CEP enviado para consulta!");
        }
    }

    const save = () => {
        const newAddress = addresses;
        newAddress.push(formValues);
        addresses = newAddress;
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adicionar endereço
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-container'>
                <h2>Inclua os dados do endereço</h2>
                <div className='search-for-cep'>
                    <input class="input" name="cep" pattern="\(\d{2}\)\d{4}-\d{4}" type="text" placeholder="CEP" onChange={handleInputChange} value={formValues.cep || ''} maxLength={120} style={{ width: "40%", marginRight: "10px" }} />
                    <span className="search-cep" onClick={() => handleSearchPerCEP()} >
                        <FontAwesomeIcon size="1x" icon={faSearch} />
                        Consultar
                    </span>
                </div>
                <input class="input" name="street" type="text" placeholder="Rua" value={formValues.street || ''} disabled maxLength={16} />
                <input class="input" name="district" type="text" placeholder="Bairro" value={formValues.district || ''} disabled maxLength={120} />
                <div className='uf-city-info'>
                    <input
                        class="input-uf"
                        name="uf" type="text" placeholder="UF"
                        onChange={handleInputChange} value={formValues.uf || ''}
                        required maxLength={2} style={{ width: "20%", marginRight: "10px" }}
                        disabled
                    />
                    <input
                        class="input"
                        name="city"
                        type="text" placeholder="Cidade"
                        onChange={handleInputChange} value={formValues.city || ''}
                        maxLength={120}
                        disabled
                    />
                </div>
                <input class="input" name="state" type="text" placeholder="Complemento" value={formValues.complement || ''} maxLength={16} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={save}>Incluir</Button>
                <Button onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddressModal;