// -------------------------------------------------------------------------------------
// Script for update image main

$('.style03 .gallery_image .all_images').on('click', '.image', function () {
    const image_main = $('.style03 .gallery_image .image_main');
    const src = $(this).find('img').attr('src');
    const alt = $(this).find('img').prop('alt');

    if (src) {
        $(image_main).find('img').remove();

        const element = `
                <img src="${src}" alt="${alt}">
            `
        $(image_main).append(element);
    }

})

// -------------------------------------------------------------------------------------
// Script for View history of images

$('.style03 .gallery_image .all_images').on('click', '.image', function () {
    const db = JSON.parse(localStorage.getItem('img_history'));
    const images = [];
    const src = $(this).find('img').attr('src');


    
    if (db) {
        
        db.forEach(function (img) {
            if (!(img == src)) {
                images.push(img);
            }
        });
    };

    images.push(src);

    localStorage.setItem('img_history', JSON.stringify(images));
})

// -------------------------------------------------------------------------------------
// View history images

$('.style03 #search-button').on('click', function () {
    const db = JSON.parse(localStorage.getItem('img_history'));
    const history = $('.style03 .history_images');

    if (!db) {
        alert("Nenhuma imagem visualizada!");
        return;
    }

    if (!history.hasClass('active')) {
        db.forEach(function (img) {
            const element = `
                    <div class="image">
                        <a download href="${img}"><img src="${img}">
                    </div>    
                `
            $(history.find('.display')).append(element);
        })
    }

    $(history).addClass('active');
})
