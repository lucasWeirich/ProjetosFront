// -------------------------------------------------------------
// Variables Global of home.html
const _infoProduct = document.getElementById('info_product');
const _similarProducts = document.getElementById('similar_products');

async function getProduct() {
    loadMain();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("product");

    const request = await fetch(`${API_BASE}photos/${id}`, { API_HEADER });
    const data = await request.json();

    showInfoProduct(data);
    await getSimilarProducts(data.albumId);
    loadMain('close');

}

function showInfoProduct(product) {
    const element = `
        <div class="__main">
            <div class="__img">
                <img src="${product.url}" alt="${product.title}">
            </div><!-- __img -->
            <div class="__info">
                <h3>${product.title}</h3>
                <span>R$ ${((product.id + 22.23).toFixed(2)).replace('.', ',')}</span>
                <button id="${product.id}" class="btn_buy_product">comprar</button>
            </div><!-- __info -->
        </div><!-- __main -->
        <div class="__description">
            <h3>Descrição do Produto:</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus libero alias assumenda harum
                repellat molestiae, et veritatis id earum, rem facere similique accusamus aspernatur. Non aut
                voluptatum delectus voluptatem deserunt.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus libero alias assumenda harum
                repellat molestiae, et veritatis id earum, rem facere similique accusamus aspernatur. Non aut
                voluptatum delectus voluptatem deserunt.</p>
        </div><!-- __description -->
    `;

    _infoProduct.innerHTML = element;
}

async function getSimilarProducts(id) {
    let element = '';
    let name = '';

    const request = await fetch(`${API_BASE}photos`, { API_HEADER });
    const data = await request.json();

    data.forEach(product => {
        if (product.albumId === id) {
            name = product.title;

            if (name.length > 35) {
                name = product.title.slice(0, 35) + '...';
            }

            element += `
                <div class="item">
                    <a href="?product=${product.id}">    
                        <div class="__item">
                            <img src="${product.thumbnailUrl}" alt="${product.title}">
                            <div class="__info">
                                <h3>${name}</h3>
                                <span>R$ ${(product.id + 33 / 2).toFixed(2)}</span>
                            </div><!-- __info -->
                            <button id="${product.id}" class="btn_buy_product">Comprar</button>
                        </div><!-- __item -->
                    </a> 
                </div>           
            `;
        }
    });

    _similarProducts.innerHTML = element;
}

// -------------------------------------------------------------
// Initialized function what get informations of product
getProduct();