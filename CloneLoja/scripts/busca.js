const buttonsPaginator = document.querySelectorAll('.buttons-paginator');
const scroolPaginator = window.document.getElementById('category_products');
let paramsSearch = window.location.search;
paramsSearch = new URLSearchParams(paramsSearch);

/* SEARCH PRODUCT */
async function getProducts() {
    loadProducts();
    const request = await fetch(`${API_BASE}photos`);
    const data = await request.json();

    await searchProduct(data, paramsSearch.get('nameProduct'));
    await saveProductCategory(data);
    loadProducts('close');
}

async function searchProduct(products, nameSearch) {
    const resultSearch = document.getElementById('products_search');

    let element = '';
    let name = '';

    products.forEach(product => {
        if (product.title.includes(nameSearch)) {

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

    resultSearch.innerHTML = element;
}

// -------------------------------------------------------------
// Save products in category
async function saveProductCategory(products) {
    createSubMenu(products);

    products.forEach(product => {
        // FAZ NADA
    });
}

// -------------------------------------------------------------
// Create subMenu of category product
function createSubMenu(products) {
    const subMenuCategory = document.getElementById('category_products');
    const aux = [];
    let element = '';

    for (const item of products) {
        if (!aux.includes(item.albumId)) {
            aux.push(item.albumId);
        }
    }

    aux.forEach(category => {
        element += `
            <li><a href="#">Categoria ${category}</a></li>
        `;
    });

    subMenuCategory.innerHTML = element;
}


// -------------------------------------------------------------
// Initialized function what get informations of product
getProducts();

//window.scrollTo(500, 0);
buttonsPaginator.forEach(btn => {
    btn.addEventListener('click', (e) => {
//        if (e.target.includes('--next')) {
            //scroolPaginator.scroll(x);
            console.log(btn)
        
    //        return;
  //      }


    })
    
});