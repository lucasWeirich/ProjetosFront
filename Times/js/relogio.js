// ----------------------------------------------------------------------
// Variables Global
const _hora = document.getElementById("hora");
const _minuto = document.getElementById("minuto");
const _segundo = document.getElementById("segundo");

function getHorario() {
    getSegundoAtual();
    getMinutoAtual();
    getHoraAtual();
}

function getHoraAtual() {
    let hora = Number(Date().substring(16, 18)) + 40;
    _hora.style.transform = `rotate(${hora}deg)`;

    setInterval(() => {
        hora = Number(Number(hora) + Number(6));
        _hora.style.transform = `rotate(${hora}deg)`;
    }, 1200000);
}

function getMinutoAtual() {
    let min = Number(Date().substring(19, 21)) + 50;
    _minuto.style.transform = `rotate(${min}deg)`;

    setInterval(() => {
        min = (Number(min) + 6);
        _minuto.style.transform = `rotate(${min}deg)`;
    }, 60000);
}

function getSegundoAtual() {
    let seg = Date().substring(22, 24);
    _segundo.style.transform = `rotate(${seg}deg)`;

    setInterval(() => {
        seg = Number(seg + 1);
        _segundo.style.transform = `rotate(${seg}deg)`;
    }, 156.66);
}

// ----------------------------------------------------------------------
// Initialized function getHorario
getHorario();