// -------------------------------------------------------------
// Variables Global of component footer
const footer = document.getElementById('footer');

footer.innerHTML = `
    <div class="container">
        <div class="__main">
            <div class="__logo">
                <img src="assets/images/logo_footer.png" alt="">
            </div>
            <div class="__item">
                <div class="__menu">
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Produtos</a></li>
                            <li><a href="#">Contato</a></li>
                        </ul>
                    </nav>
                    <div class="__social">
                        <a href="#"><img src="assets/images/insta.png" alt=""></a>
                        <a href="#"><img src="assets/images/face.png" alt=""></a>
                    </div><!-- __social -->
                </div><!-- __menu -->
                <div class="__info">
                    <div>
                        <a href="#" class="--whats">49 9999-9999</a>
                        <a href="#" class="--email">alguem@gmail.com.br</a>
                    </div>
                    <div>
                        <a href="#" class="--loja">CNPJ 11.111.111/1111-11</a>
                        <a href="#" class="--local">Rua Center - 260 - CIDADE - SC</a>
                    </div>
                </div><!-- __info -->
            </div><!-- __item -->
        </div><!-- __main -->
        <div class="__footer">
            <p>Clone desenvolvido por <span>Lucas Weirich</span></p>
        </div><!-- __footer -->
    </div><!-- container -->
`;