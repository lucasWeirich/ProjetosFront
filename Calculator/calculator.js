// Declarations variables global of project
const _htmlButtons = document.getElementById('buttons_calc');
const _allButtons = document.querySelector('#buttons_calc');
const _displayOperation = document.querySelector('.calculator .display .operation');
const _displayResult = document.querySelector('.calculator .display .result');
const _displayHistory = document.querySelector('.calculator .display .history');
const operations = {
    sum: (a, b) => a + b,
    sub: (a, b) => a - b,
    mult: (a, b) => a * b,
    div: (a, b) => a / b,
    por: (a, b) => (a * b) / 100,
    root2: (a) => Math.sqrt(a),
};

// Create html of the buttons calculator
const createButtons = () => {
    const buttons = ["AC", "C", "√", "%", 7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ",", "=", "+"];

    buttons.forEach(item => {
        _htmlButtons.innerHTML += `
            <button id="${item}" onclick="displayScreen(id)">${item}</button>
        `;
    })
}

// Display numbers and operations on screen
const displayScreen = (id) => {
    const data = validationButton(id);

    _displayOperation.innerHTML += `${data}`;
}

// Validation type of button
const validationButton = (type) => {

    for (let i = 0; i <= 10; i++) {
        if (type == i) {
            calculator(type);
            return type;
        }
    }

    return typeAccount(type) || '';
}

const calculator = (newNumber) => {
    let result = JSON.parse(sessionStorage.getItem('resultAccount'));
    let secondNum = 0;
    let resultCompleted = 0;

    function getSecondNum({ positionSecondNumber }) {
        secondNum = _displayOperation.textContent.substring(positionSecondNumber) + `${newNumber}`;
        secondNum = secondNum.replace(",", ".");
    }

    function viewResult(resultCompleted) {
        _displayResult.innerHTML = `${resultCompleted}`;
        sessionStorage.setItem('result_completed', resultCompleted);
    }

    if (result) {
        switch (result.operation) {
            case "%":
                getSecondNum(result);
                resultCompleted = operations.por(result.number, Number(secondNum));
                viewResult(resultCompleted);
                break;

            case "√":
                getSecondNum(result);
                resultCompleted = operations.root2(Number(secondNum));
                viewResult(resultCompleted);
                break;

            case "/":
                getSecondNum(result);
                resultCompleted = operations.div(result.number, Number(secondNum));
                viewResult(resultCompleted);
                break;

            case "*":
                getSecondNum(result);
                resultCompleted = operations.mult(result.number, Number(secondNum));
                viewResult(resultCompleted);
                break;

            case "-":
                getSecondNum(result);
                resultCompleted = operations.sub(result.number, Number(secondNum));
                viewResult(resultCompleted);
                break;

            case "+":
                getSecondNum(result);
                resultCompleted = operations.sum(result.number, Number(secondNum));
                viewResult(resultCompleted);
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
            _displayResult.innerHTML = '0';
            sessionStorage.clear();
            break;

        // Operations
        case "√":
            validateOperator(type);
            break;

        case "%":
            validateOperator(type);
            break;

        case "/":
            validateOperator(type);
            break;

        case "*":
            validateOperator(type);
            break;

        case "-":
            validateOperator(type);
            break;

        case "+":
            validateOperator(type);
            break;

        case "=":
            let history = sessionStorage.getItem('result_completed');

            _displayHistory.innerHTML = `${_displayOperation.textContent} = ${history}`;
            _displayOperation.innerHTML = '';
            _displayResult.innerHTML = '';
            sessionStorage.removeItem('resultAccount');
            break;

        case ",":
            _displayOperation.innerHTML += '.';
            break;

        default:
            let data = sessionStorage.getItem("alertKeypress");
            if (data < 10) {
                alert("Opção não encontrada!");
            } else if (data < 11) {
                alert("Último aviso de opção não encontrada!");
            }
            break;
    }
}

// Validations type operation
const validateOperator = (type) => {
    sessionStorage.setItem('resultAccount', JSON.stringify({
        number: Number(_displayOperation.textContent),
        operation: type,
        positionSecondNumber: _displayOperation.textContent.length + 2
    }));

    let result = _displayOperation.textContent;
    _displayResult.innerHTML = `${result}`;
    _displayOperation.innerHTML += ` ${type} `;
}

// Initialized buttons of calculator
createButtons();

// Remove history of the accounts
const removeHistory = () => {
    _displayHistory.innerHTML = '';
}

// NAO MUDA DE TEMA MAS JÁ ADICIONA A CLASSE
const alterTheme = () => {
    document.getElementById('theme').classList.toggle("--darkmode");
}

// GETS keyboard of input
window.addEventListener("keypress", (e) => {
    e.preventDefault();
    let numAlert = Number(sessionStorage.getItem("alertKeypress") || 0);

    sessionStorage.setItem("alertKeypress", Number(numAlert + 1));
    displayScreen(e.key);
})