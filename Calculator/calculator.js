// Declarations variables global of project
const _htmlButtons = document.getElementById('buttons_calc');
const _allButtons = document.querySelector('#buttons_calc');
const _displayOperation = document.querySelector('.calculator .display .operation');
const _displayResult = document.querySelector('.calculator .display .result');

// Create html of the buttons calculator
const createButtons = () => {
    const buttons = ["AC", "C", "+/-", "%", 7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ",", "=", "+"];

    buttons.forEach(item => {
        _htmlButtons.innerHTML += `
            <button id="${item}" onclick="displayScreen(id)">${item}</button>
        `;
    })
}

// Display numbers and operations on screen
const displayScreen = (id) => {
    const data = validationButton(id);
    let result = 0;


    _displayOperation.innerHTML += `${data}`;
    //_displayResult.innerHTML = `${result}`;
}

// Validation type of button
const validationButton = (type) => {

    for (let i = 0; i <= 10; i++) {
        if (type == i) {
            calculator(Number(type));
            return type;
        }
    }

    /*  if (typeof type === Number) {
         return type;
     } */

    return typeAccount(type) || '';
}

const calculator = (newNumber) => {
    let result = JSON.parse(sessionStorage.getItem('resultAccount'));

    if (result) {
        switch (result.operation) {
            case "%":
                result = (result.number * newNumber)/100;
                    _displayResult.innerHTML = `${result}`;
                break;

            default:
                break;
        }
    }
}

// Validation type of account
const typeAccount = (type) => {

    switch (type) {
        case "AC":
            const newOperation = _displayOperation.textContent.slice(0, -1);
            _displayOperation.innerHTML = newOperation;
            break;

        case "C":
            _displayOperation.innerHTML = '0';
            break;

        // Operations
        case "+/-":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case "%":
            sessionStorage.setItem('resultAccount', JSON.stringify({
                number: Number(_displayOperation.textContent),
                operation: type
            }));
            let result = _displayOperation.textContent;
            _displayResult.innerHTML = `${result}`;
            _displayOperation.innerHTML += ` ${type} `;
            break;

        case "/":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case "*":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case "-":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case "+":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case "/":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case "=":
            _displayOperation.innerHTML = 'NÃO FUNCIONA AINDA!!!';
            break;

        case ",":
            _displayOperation.innerHTML += '.';
            break;

        default:
            break;
    }
}

// Initialized buttons of calculator
createButtons();


// NAO MUDA DE TEMA MAS JÁ ADICIONA A CLASSE
const alterTheme = () => {
    document.getElementById('theme').classList.toggle("--darkmode");
}