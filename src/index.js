import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from './components/Footer/FooterComponent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <HeaderComponent />
      <App />
    {/* <FooterComponent /> */}
  </BrowserRouter>
);  

reportWebVitals();
