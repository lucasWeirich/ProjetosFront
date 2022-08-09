// -------------------------------------------------------------------------------------
//Script for open fancybox images
$('.style02 .gallery_image').on('click', '.image', function () {
    $('.popup .img').remove();

    const src = $(this).find('img').attr('src');
    const alt = $(this).find('img').prop('alt');

    const element = `
                <div class="img">
                    <img src="${src}" alt="${alt}">
                    <span>${alt}</span> 
                </div>
            `

    $('.popup .content').append(element);

    $('.popup').addClass('active');
})

//Script for close fancybox images
$('.popup').on('click', (e) => {
    if (e.target.className == "content" || e.target.id == "close_popup") {
        $('.popup').removeClass('active');
    }
})


// -------------------------------------------------------------------------------------
// Script for get images

$('.style02 #search-button').on('click', function () {
    const search = document.getElementById('search').value;
    searchPhotos(url_base, cliente_id, search);
});

function randomNumber(max, total) {
    const numbers = [];

    for (let i = 1; i <= max; i++) {
        const random = Math.floor(Math.random() * total);
        numbers.push(random);
    }

    return numbers;
}

function searchPhotos(api, id, search) {

    $.ajax({
        methods: "get",
        url: `${api}search/photos?query=${search}&client_id=${id}&page=300`,
        success: (data) => {
            console.log(data);

            const total = data.total / data.total_pages;
            const maxCollums = 4;
            const maxImage = 5;
            const max = maxImage * maxCollums;
            const randoms = randomNumber(max, total);

            $(".style02 .gallery_image .collums .image").remove();
            for (let i = 0; i < maxCollums; i++) {
                /*                 console.log(
                                    randoms[i],
                                    data.results[randoms[i]].urls.thumb
                                ); */

                for (let a = 0; a < maxImage; a++) {
                    const c = a + i;
                    const src = data.results[c].urls.thumb;
                    const alt = data.results[c].alt_description;

                    const element = `
                        <div class="image">
                            <img src="${src}" alt="${alt}">
                        </div>
                    `;

                    $(`.style02 .gallery_image .--${i}`).append(element);
                }
            }
        }
    })
}