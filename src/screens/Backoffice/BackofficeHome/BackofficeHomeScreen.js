import './BackofficeHomeScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBoxesStacked } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { useNavigate } from 'react-router-dom';


function BackofficeHomeScreen() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const nextPage = (e) => {
    navigate(e)
  }

  return (
    <main class="container">
      {
        userInfo != null && userInfo.userType !== "CLIENTE" ?
          <>
            <header class="initial">
              <h1>BACKOFFICE</h1>
              <p style={{ color: "black" }}>Escolha qual rotina deseja selecionar</p>
            </header>

            <section class="boxes">
              {userInfo.userType === "ADMIN" ?
                <>
                  <section class="options">
                    <a href='/backoffice/users/list' onClick={nextPage("/backoffice/users/list")}>
                      <div class="logos">
                        <FontAwesomeIcon size="9x" icon={faUsers} inverse />
                      </div>
                      <h3>Gerenciar usuários</h3>
                    </a>
                  </section>
                </> : <> </>
              }

              <section class="options">
                <a href='/backoffice/products/list' onClick={nextPage("/backoffice/products/list")}>
                  <div class="logos">
                    <FontAwesomeIcon size="9x" icon={faBoxesStacked} inverse />
                    <h3>Gerenciar produtos</h3>
                  </div>
                </a>
              </section>
            </section>
          </> : <>
          </>

      }
    </main>
  );
}

export default BackofficeHomeScreen;