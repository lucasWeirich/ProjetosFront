// ----------------------------------------------------------------------
// Variables Global
const _result = document.getElementById("result");
const _history = document.getElementById("history");
const _redefinir = document.getElementById("redefinir");
const _start = document.getElementById("start");
const _save = document.getElementById("save");
const _stop = document.getElementById("stop");
let time = null;

function start() {
    let second = 0;
    let minute = 0;

    time = setInterval(() => {
        if (second < 59) {
            second++;
        } else {
            minute++;
            second = 0;
        }
        viewResult(second, minute);
    }, 1000);

    _start.classList.remove("ativo");
    _redefinir.classList.add("ativo");
    _save.classList.add("ativo");
    _stop.classList.add("ativo");
}

function viewResult(second, minute) {
    if (minute < 10 && second < 10) {
        _result.innerHTML = `0${minute}:0${second}`;
    } else if (minute < 10) {
        _result.innerHTML = `0${minute}:${second}`;
    } else if (second < 10) {
        _result.innerHTML = `${minute}:0${second}`;
    } else {
        _result.innerHTML = `${minute}:${second}`;
    }
}

function save() {
    let numSave = _history.childElementCount + 1;

    _history.innerHTML += (
        `<p>${numSave}º time: ${_result.textContent}</p>`
    );
}

function redefinir() {
    clearInterval(time);
    _result.innerHTML = '00:00';
    _history.innerHTML = "";

    _redefinir.classList.remove("ativo");
    _save.classList.remove("ativo");
    _stop.classList.remove("ativo");
    _start.classList.add("ativo");
}

function stop() {
    clearInterval(time);
}