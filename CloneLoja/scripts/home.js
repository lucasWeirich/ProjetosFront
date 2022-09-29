// -------------------------------------------------------------
// Variables Global of home.html
const _displayProducts = document.getElementById('products_main');

async function getProducts() {
    loadProducts();
    const request = await fetch(`${API_BASE}photos`);
    const data = await request.json();
    showProducts(data);
}

function showProducts(products) {
    let element = '';
    let name = '';

    products.forEach(product => {
        if (product.id < 10) {
            name = product.title;

            if (name.length > 35) {
                name = product.title.slice(0, 35) + '...';
            }

            element += `
                <a href="detalhes.html?product=${product.id}">    
                    <div class="__item">
                        <img src="${product.thumbnailUrl}" alt="${product.title}">
                        <div class="__info">
                            <h3>${name}</h3>
                            <span>R$ ${(product.id + 33 / 2).toFixed(2)}</span>
                        </div><!-- __info -->
                        <button id="${product.id}" class="btn_buy_product">Comprar</button>
                    </div><!-- __item -->
                </a>
            `;
        }
    });

    _displayProducts.innerHTML = element;
    loadProducts('close');
}

getProducts();