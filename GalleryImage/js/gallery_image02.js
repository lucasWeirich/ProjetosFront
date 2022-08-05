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

                /*  console.log(
                     randoms[i],
                     data.results[randoms[i]].urls.thumb
                 );
 
                 const image = data.results[randoms[i]].urls.thumb;
 
 
                 const element = `
                     <div class="image">
                         <img src="${image}" alt="">
                     </div>
                 `; */

                /* $(".gallery_image").append(element); */
            }
        }
    })
}

