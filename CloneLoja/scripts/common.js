const API_BASE = 'https://jsonplaceholder.typicode.com/';
const API_HEADER = `headers: {'Content-type': 'application/json; charset=UTF-8'}`;
const _loadProducts = document.getElementById('loading_products');
const _buttonsBuy = document.getElementsByClassName('btn_buy_product');
const _qtdBuy = document.getElementById("qtd_buy");

/* 
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('name', 'Matheus');
  window.location.search = urlParams;
*/

/* COMPRAR */
function buyProduct(product) {
    addCart(product);
}

/* ADD PRODUCT IN CART */
function addCart(product) {
    const db = JSON.parse(localStorage.getItem('cartBuy'));
    const cart = [];

    if (db) {
        db.forEach(item => {
            if (!(item === product)) cart.push(item);
        });
    }

    cart.push(product);

    localStorage.setItem('cartBuy', JSON.stringify(cart));
    controllerQtdBuy();
}

/* FUNCTION CONTROLLER QTD BUY OF PRODUCTS */
function controllerQtdBuy() {
    const qtd = JSON.parse(localStorage.getItem('cartBuy'));
    if (qtd) {
        _qtdBuy.innerHTML = qtd.length;
    }
}
controllerQtdBuy();

/* GET BUTTONS FOR BUY PRODUCT */
setTimeout(() => {
    for (const btn of _buttonsBuy) {
        btn.addEventListener('click', () => {
            buyProduct(btn.id);
        })
    }
}, 1000)

/* LOADS */
function loadProducts(close) {
    let element = ''

    if (close) {
        _loadProducts.innerHTML = '';
        return;
    }

    for (let i = 1; i < 10; i++) {
        element += `
            <div class="card-loading">
                <div class="img"></div>
                <div class="content">
                    <div class="title"></div>
                    <div class="txt"></div>
                </div>
            </div>
       `;
    }

    _loadProducts.innerHTML = element;
}

function loadMain(close) {
    let loadMain = document.getElementById('load_main');
    if (close) {
        loadMain.style.display = 'none';
        return;
    }
    loadMain.style.display = 'initial';
}
