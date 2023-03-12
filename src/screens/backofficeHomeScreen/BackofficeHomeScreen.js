import './BackofficeHomeScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBoxesStacked } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function BackofficeHomeScreen() {
  const location = useLocation();
  const navigate = useNavigate();


  const nextPage = (e) => {
    console.log(location.state);
    navigate(e, { state: location.state })
  }

  return (
    <main class="container">
      {
        location.state != null ?
          <>
            <header class="initial">
              <h1>BACKOFFICE</h1>
              <p style={{ color: "black" }}>Escolha qual rotina deseja selecionar</p>
            </header>

            <section class="boxes">
              {location.state.userType === "ADMIN" ?
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
                <div class="logos">
                  <FontAwesomeIcon size="9x" icon={faBoxesStacked} inverse />
                  <h3>Gerenciar produtos</h3>
                </div>
              </section>
            </section>
          </> : <>
            <h1>Você não pode acessar essa rotina!</h1>
          </>

      }
    </main>
  );
}

export default BackofficeHomeScreen;