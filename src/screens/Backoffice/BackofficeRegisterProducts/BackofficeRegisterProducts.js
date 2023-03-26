import React, { useState, useEffect } from "react";
import "./BackofficeRegisterProducts.css";
import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';


<html>
    
<head>
    <meta charset="UTF-8">
    <title>Registrar Produto</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #ccc;
        padding: 20px;
        border-radius: 10px;
      }

      label {
        display: block;
        margin-bottom: 10px;
      }

      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 2px solid #ccc;
      }

      input[type="submit"] {
        background-color: #4caf50;
        color:black;
        font-weight: bold;
        border-radius: 3px;
        cursor: pointer;
      } 

    </style>
  </head>
 
  <body>
    <form>
      <h1>Registrar Produto</h1>
      <label for="nome">Nome do Produto (máx 200 caracteres):</label>
      <input type="text" id="nome" name="nome" maxlength="200" placeholder="Ex: Nike AirMax one..." required>

      <label for="descricao">Descrição Detalhada (máx 2000 caracteres):</label>
      <textarea id="descricao" name="descricao" maxlength="2000" rows="10" cols="50" placeholder="Ex: O modelo de tênis voltado para corridas, é composto por fibra de carbono, pelo de carneiro..." required></textarea>

      <label for="valor">Valor do Produto:</label>
      <input type="number" id="valor" name="valor" step="0.01" placeholder="Ex: R$ 500,00" required>

      <label for="quantidade">Quantidade no Estoque:</label>
      <input type="number" id="quantidade" name="quantidade" placeholder="Ex: 20" required>


      <input type="submit" value="Salvar">
    </form>
  </body>
</html>      