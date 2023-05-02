const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const greetingMessage = () => {
    let h = new Date().toLocaleTimeString('pt-BR', { hour: 'numeric', hour12: false }); // formato 24 horas (0-23)
    let message;
    if (h >= 0 && h <= 5) { // entre meia noite (0h) e 5 da madrugada
        message = 'Boa madrugada';
    } else if (h >= 6 && h < 12) { // entre 6 e 11 da manhã
        message = 'Bom dia';
    } else if (h >= 12 && h < 18) { // entre meio dia (12h) e 17 (5h) da tarde
        message = 'Boa tarde';
    } else if (h >= 18 && h <= 23) { // entre 18 (6h) e 23 (11h) da noite
        message = 'Boa noite';
    }

    if (userInfo != null) message = message + `, ${userInfo.username}`;

    return message;
}

export default greetingMessage;