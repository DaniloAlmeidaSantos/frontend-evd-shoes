import './BackofficeHomeScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBoxesStacked } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import {useLocation } from 'react-router-dom';


function BackofficeHomeScreen() {
  const location = useLocation();
  console.log(location.state);
  return (
    <body>
      <main class="container">
        <header class="header">
          <h1>BACKOFFICE</h1>
          <p>Escolha qual rotina deseja selecionar</p>
        </header>
        <section class="boxes">
          <section class="options">
            <a href='/users/list'>
              <div class="logos">
                <FontAwesomeIcon size="9x" icon={faUsers} inverse />
              </div>
              <h3>Gerenciar usuários</h3>
            </a>
          </section>
          <section class="options">
            <div class="logos">
              <FontAwesomeIcon size="9x" icon={faBoxesStacked} inverse />
              <h3>Gerenciar produtos</h3>
            </div>
          </section>
        </section>
      </main>
    </body>
  );
}

export default BackofficeHomeScreen;