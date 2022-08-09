// -------------------------------------------------------------------------------------
// Script for update image main

$('.style03 .gallery_image .all_images').on('click', '.image', function () {
    const image_main = $('.style03 .gallery_image .image_main');
    const src = $(this).find('img').attr('src');
    const alt = $(this).find('img').prop('alt');

    if (src) {
        $(image_main).find('img').remove()

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
            images.push(img);
        });
    }

    images.push(src)

    localStorage.setItem('img_history', JSON.stringify(images));
    //console.log(images);
})
