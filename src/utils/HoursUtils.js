const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const greetingMessage = () => {
    let h = new Date().toLocaleTimeString('pt-BR', { hour: 'numeric', hour12: false }); // formato 24 horas (0-23)
    if (h >= 0 && h <= 5) { // entre meia noite (0h) e 5 da madrugada
        return 'Boa madrugada, ' + userInfo.username;
    } else if (h >= 6 && h < 12) { // entre 6 e 11 da manhã
        return 'Bom dia, ' + userInfo.username; ;
    } else if (h >= 12 && h < 18) { // entre meio dia (12h) e 17 (5h) da tarde
        return 'Boa tarde, ' + userInfo.username;;
    } else if (h >= 18 && h <= 23) { // entre 18 (6h) e 23 (11h) da noite
        return 'Boa noite, ' + userInfo.username;;
    }
}

export default greetingMessage;