// -------------------------------------------------------------
// Variables Global of component header
const header = document.getElementById('header');
const menuMobile = document.getElementById('menu_mobile');

header.innerHTML = `
    <div class="container">
        <div class="__logo"><a href="/ProjetosFront/CloneLoja/"><img src="assets/images/logo.png" alt="Logo da Loja"></a></div>
        <div class="__menu">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Produtos</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </nav>
        </div><!-- __menu -->
        <div class="__additional">
            <div class="__cart">
                <img src="assets/images/cart_menu.png" alt="Carrinho">
                <span id="qtd_buy">0</span>
            </div><!-- __cart -->
            <div class="__search">
                <form class="forms" action="busca.html">
                    <div class="--search">
                        <input type="text" name="nameProduct" placeholder="Pequisar produto...">
                        <input type="submit" value="">
                    </div>
                </form>
            </div><!-- __search -->
        </div><!-- __additional -->
    </div><!-- container -->
    <div id="menu_mobile">
        MENU

        <div class="dropdown">
            |||
        </div>

        <nav>
            <ul>
                <li class="--subMenu">
                    <a href="#">HOME</a>
                    <ul>
                        <li><a href="#">TESTE DE PRODUTO</a>
                        <li><a href="#">TESTE DE PRODUTO</a>
                    </ul>
                </li>
                <li><a href="#">PRODUTOS</a></li>
                <li><a href="#">CONTATO</a></li>
            </ul>
        </nav>
    </div>
`;

let auxScrool = 0;
window.addEventListener("scroll", async () => {
    const scroll = this.scrollY;

    /* if (scroll > auxScrool) {
        menuMobile.classList.add('--hidden');
    } else {
        menuMobile.classList.remove('--hidden');
    }
    auxScrool = scroll; */

    if (scroll > 100) {
        header.classList.add('--scroll');

    } else {
        header.classList.remove('--scroll');
    }
});


/* MENU - MOBILE */
$('#menu_mobile .dropdown').on('click', () => {
    $('#menu_mobile nav').toggleClass('--active');
})

// SubMenu 
$('#menu_mobile nav ul li').on('click', function () {
    $('#menu_mobile nav ul li'.matchAll).removeClass('--active');
    if ($(this).hasClass('--subMenu')) {
        $(this).toggleClass('--active');
    }
})
