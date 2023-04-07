/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./BackofficeRegisterProducts.css";
import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductsImageRegister from "../../../components/ProductsImageRegister/ProductsImageRegister";

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

function BackofficeProductsRegister() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getProductsForm = async () => {
    if (id != null) {
      let response = await fetch(
        'https://backend-evd-api.herokuapp.com/backoffice/product?id=' + id,
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
          setFormValues(resp);
          setImages(resp.productImages);
        })
      }
    }

    setLoading(false);
  }

  const addImage = (file, name) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const nImages = [...images];
      nImages.push({ 'name': name, 'file': reader.result })
      setImages(nImages);
      return;
    };

    reader.onerror = function (error) {
      alert("Erro ao adicionar imagem " + name + ", mensagem do erro: " + error);
      return;
    };
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      addImage(files[i], files[i].name);
    }
  }

  useEffect(() => {
    setLoading(true);
    getProductsForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    setLoading(true);
    let response = null;

    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const request = {
      'idProduct': id,
      'nameProduct': data.nameProduct,
      'description': data.description,
      'cost': data.cost,
      'quantity': data.quantity,
      'ratio': data.ratio,
      'brand': data.brand,
      'productImages': images
    }

    console.log(request);

    if (id != null) {
      response = await fetch(
        'https://backend-evd-api.herokuapp.com/backoffice/product/update',
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
        'https://backend-evd-api.herokuapp.com/backoffice/product/add',
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
        navigate('/backoffice/products/list')
      })
      alert("Sucesso na inclusão do produto!");
    } else {
      alert('Erro ao cadastrar / atualizar produto, favor tente novamente mais tarde!');
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ratio' && (value > 5 || value < 0)) {
      alert("Digite um valor para a avaliação entre 0 e 5!")
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

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
            <h1>Registrar Produto</h1>
            <label for="name">Nome do Produto:
              <input
                type="text"
                name="nameProduct"
                maxlength="200"
                placeholder="Ex: Nike AirMax one..."
                disabled={userInfo.userType !== "ADMIN"}
                value={formValues.nameProduct || ''}
                required maxLength={100}
                onChange={handleInputChange}
              />
            </label>

            <label for="brand">Marca:
              <input
                type="text"
                name="brand"
                maxlength="60"
                placeholder="Ex: Nike"
                disabled={userInfo.userType !== "ADMIN"}
                value={formValues.brand || ''}
                required maxLength={100}
                onChange={handleInputChange}
              />
            </label>

            <label for="description">Descrição Detalhada:
              <textarea
                name="description"
                maxlength="2000" rows="10" cols="50"
                placeholder="Ex: O modelo de tênis voltado para corridas, é composto por fibra de carbono, pelo de carneiro..."
                required
                disabled={userInfo.userType !== "ADMIN"}
                value={formValues.description || ''}
                onChange={handleInputChange}
              >
              </textarea>
            </label>
            <label for="cost">Valor do Produto:
              <input
                type="number"
                name="cost"
                step="0.01"
                placeholder="Ex: R$ 500,00"
                required
                disabled={userInfo.userType !== "ADMIN"}
                onChange={handleInputChange}
                value={formValues.cost || ''}
              />
            </label>

            <label for="quantity">Quantidade no Estoque:
              <input
                type="number"
                name="quantity"
                placeholder="Ex: 20"
                required
                onChange={handleInputChange}
                value={formValues.quantity || ''}
              />
            </label>

            <label for="ratio">Avaliação:
              <input
                type="number"
                name="ratio"
                step="0.01"
                placeholder="Ex: 3.5"
                required
                disabled={userInfo.userType !== "ADMIN"}
                onChange={handleInputChange}
                value={formValues.ratio || ''}
              />
            </label>
            <label className="image-block" for="image">
              Selecione suas imagens:
              <input
                type="file"
                name="file-image"
                id="image"
                data-ajax='false'
                disabled={userInfo.userType !== "ADMIN"}
                onChange={handleFileChange}
              />
              <FontAwesomeIcon size="2x" icon={faPlus} className="add-image" />
            </label>
            <ProductsImageRegister object={images} />
            <br />
            <input type="submit" value="Salvar" />
            <a href={"/backoffice/products/list"} className="btn-cancel">Cancelar</a>
          </form>
          <br />
        </>
      }
    </main>
  );
}

export default BackofficeProductsRegister;   