// -------------------------------------------------------------
// Function create HTML of table TicTacToe
function createTable() {
    const tableHTML = document.getElementById('table_tictactoe');
    let aux = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let element = '';

    aux.forEach(i => {
        element += `
            <div class="__item" id="${i}"></div>
        `;
    })

    tableHTML.innerHTML = element;
}
createTable()

// -------------------------------------------------------------
// Variables Global
const _inputs = document.querySelectorAll('.__table .__item');
const _playerPlay = document.querySelector('.__playerPlay span');
const _x = document.getElementById('x');
const _o = document.getElementById('o');
const _history = document.querySelector('.__history .__info');
const auxWinner = {
    //ROWS
    one: (aux, e) => { if (aux[1].classList.value === `__item --${e}` && aux[2].classList.value === `__item --${e}` && aux[3].classList.value === `__item --${e}`) return true; },
    two: (aux, e) => { if (aux[4].classList.value === `__item --${e}` && aux[5].classList.value === `__item --${e}` && aux[6].classList.value === `__item --${e}`) return true; },
    three: (aux, e) => { if (aux[7].classList.value === `__item --${e}` && aux[8].classList.value === `__item --${e}` && aux[9].classList.value === `__item --${e}`) return true; },
    //COLUMNS
    four: (aux, e) => { if (aux[1].classList.value === `__item --${e}` && aux[4].classList.value === `__item --${e}` && aux[7].classList.value === `__item --${e}`) return true; },
    five: (aux, e) => { if (aux[2].classList.value === `__item --${e}` && aux[5].classList.value === `__item --${e}` && aux[8].classList.value === `__item --${e}`) return true; },
    six: (aux, e) => { if (aux[3].classList.value === `__item --${e}` && aux[6].classList.value === `__item --${e}` && aux[9].classList.value === `__item --${e}`) return true; },
    //DIAGONAL
    seven: (aux, e) => { if (aux[1].classList.value === `__item --${e}` && aux[5].classList.value === `__item --${e}` && aux[9].classList.value === `__item --${e}`) return true; },
    eight: (aux, e) => { if (aux[3].classList.value === `__item --${e}` && aux[5].classList.value === `__item --${e}` && aux[7].classList.value === `__item --${e}`) return true; },
};
const _countWinners = {
    _x: a => { a++; _x.innerHTML = a; localStorage.setItem('x', a) },
    _o: a => { a++; _o.innerHTML = a; localStorage.setItem('x', a) }
}
let player = 'x';
_x.innerHTML = localStorage.getItem('x') || 0;
_o.innerHTML = localStorage.getItem('o') || 0;


// -------------------------------------------------------------
// Function validate inputs for view winner
function validateInputsWinner(e) {
    const aux = [];
    let historyWinner = JSON.parse(localStorage.getItem('history')) || [];

    for (let i = 1; i < 10; i++) {
        aux[i] = document.getElementById(i);
    }

    if (isWinner(aux, e)) {

        if (e === 'x') {
            _countWinners._x(Number(_x.textContent));
            localStorage.setItem('x', Number(_x.textContent));
            localStorage.setItem('o', Number(_o.textContent));
        } else if (e === 'o') {
            _countWinners._o(Number(_o.textContent));
            localStorage.setItem('o', Number(_o.textContent));
            localStorage.setItem('x', Number(_x.textContent));
        }

        _playerPlay.classList = `--${e}`;
        _playerPlay.innerHTML = 'GANHOUU!';

        aux.forEach(item => {
            item.classList.remove('--x', '--o');
            item.classList.add(`--${e}`)
            item.innerHTML = e;
        })

        historyWinner.push({
            date: Date().substring(16, 21),
            x: _x.textContent,
            o: _o.textContent,
            winner: e
        });

        localStorage.setItem('history', JSON.stringify(historyWinner));
        createHistory();

        setTimeout(() => {
            let initial = confirm("Aperte em CONFIRMAR para começar o jogo novamente!");

            if (initial) {
                aux.forEach(item => {
                    item.classList.remove('--x', '--o');
                    item.innerHTML = '';
                })
                if (e === 'x') {
                    _playerPlay.classList = `--o`;
                    _playerPlay.innerHTML = 'o';
                } else {
                    _playerPlay.classList = `--x`;
                    _playerPlay.innerHTML = 'x';
                }
            }
        }, 1000);
        return false;
    }
    return true;
}

// -------------------------------------------------------------
// Function valida if player winner
function isWinner(aux, e) {

    if (auxWinner.one(aux, e) || auxWinner.two(aux, e) || auxWinner.three(aux, e)
        || auxWinner.four(aux, e) || auxWinner.five(aux, e) || auxWinner.six(aux, e)
        || auxWinner.seven(aux, e) || auxWinner.eight(aux, e)) {
        return true;
    }
}

// -------------------------------------------------------------
// Function click Button
for (const item of _inputs) {
    item.addEventListener('click', () => {
        if (validateBloqued(item)) {
            validatePlayer(item);
        }
    })
}

// -------------------------------------------------------------
// Function validate if input not bloqued
function validateBloqued(btn) {
    if (btn.className === '__item') {
        return true;
    }
    return false;
}

// -------------------------------------------------------------
// Function validate player
function validatePlayer(btn) {
    if (player === 'x') {
        addedAllPlayer(btn, 'x');
        if (validateInputsWinner('x')) {
            _playerPlay.classList = '--o';
            _playerPlay.innerHTML = 'o';
        }
    } else if (player === 'o') {
        addedAllPlayer(btn, 'o');
        if (validateInputsWinner('o')) {
            _playerPlay.classList = '--x';
            _playerPlay.innerHTML = 'x';
        }
    }
}

// -------------------------------------------------------------
// Function added all about player
function addedAllPlayer(btn, option) {
    btn.classList.add(`--${option}`);
    btn.innerHTML = option;

    if (option === 'x') {
        player = 'o';
        return;
    }
    player = 'x';
}


// -------------------------------------------------------------
// Function for history visible
function history() {
    _history.classList.toggle('--active');
    createHistory();
}

// -------------------------------------------------------------
// Function create data of history
function createHistory() {
    const hist = JSON.parse(localStorage.getItem('history'));
    let element = '';

    if (hist) {
        hist.forEach(i => {
            element += `
                <p data-winner="${i.winner}" class="--${i.winner}">${i.date}h - Placar ${i.x}:${i.o}</p>
            `;
        });
    }

    _history.innerHTML = element;
}

// -------------------------------------------------------------
// Function reset data of game - New Game
function resetGame() {
    localStorage.clear();
    _playerPlay.classList = '--x';
    _playerPlay.innerHTML = 'x';
    _x.innerHTML = 0;
    _o.innerHTML = 0;

    alert("Recomendamos que atualize a página para não enfrentar probremas!");
}
