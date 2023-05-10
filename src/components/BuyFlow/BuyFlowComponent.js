import React from "react";
import './BuyFlow.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";

function BuyFlowComponent(props) {
    const { flowStatus } = props;

    return (
       <header className="flow-header">
            <hr/>
            <section className="flow-status">
                <FontAwesomeIcon color="red" icon={faBasketballBall} size="6x" />
                <p>Detalhes</p>
            </section>
            <hr style={{borderColor: flowStatus > 1 ? "red" : "black" }} />
            <section className="flow-status">
                <FontAwesomeIcon color={flowStatus > 1 ? "red" : "black"} icon={faBasketballBall} size="6x" />
                <p>Pagamento</p>
            </section>
            <hr style={{borderColor: flowStatus > 2 ? "red" : "black" }} />
            <section className="flow-status">
                <FontAwesomeIcon color={flowStatus > 2 ? "red" : "black"} icon={faBasketballBall} size="6x" />
                <p>Confirmar</p>
            </section>
            <hr style={{borderColor: flowStatus > 2 ? "red" : "black" }}/>
       </header>
    );

}

export default BuyFlowComponent;