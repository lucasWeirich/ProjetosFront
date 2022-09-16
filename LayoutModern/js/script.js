// ------------------------------------------------------------------------------------
// Variables 
const _link_destination = document.querySelectorAll("div.__menu_maps a");
const _info_destination = document.getElementById("information_destination");
const _title_destination = document.getElementById("title_destination");
const _img_maps = document.getElementById('img_maps');

// Datas for text of destination
const txt_moon = {
    title: "Moon",
    txt: "Moon See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    avg: "Avg. distance",
    km: "384,400 km",
    est: "Est. travel time",
    years: "3 days",
    img: "assets/img/destination/image-moon.png"
};
const txt_mars = {
    title: "mars",
    txt: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    avg: "Avg. distance ",
    km: "225 mil. km",
    est: "Est. travel time ",
    years: "9 months",
    img: "assets/img/destination/image-mars.png"
};
const txt_europa = {
    title: "europa",
    txt: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin. ",
    avg: "Avg. distance",
    km: "628 mil. km",
    est: "Est. travel time ",
    years: "3 years",
    img: "assets/img/destination/image-europa.png"
};
const txt_titan = {
    title: "titan",
    txt: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn. ",
    avg: "Avg. distance ",
    km: "1.6 bil. km",
    est: "Est. travel time ",
    years: "7 years",
    img: "assets/img/destination/image-titan.png"
};

function maps(maps) {
    let map = '';
    switch (maps) {
        case "moon":
            map = txt_moon;
            break;


        case "mars":
            map = txt_mars;
            break;

        case "europa":
            map = txt_europa;
            break;

        case "titan":
            map = txt_titan;
            break;
        default:
            map = txt_moon;
            break;
    }
    completDatas(map)
}

function completDatas(data) {
    const element = `
        <p>${data.txt}</p>

        <div class="__datas_maps">
            <ul>
                <li>
                    <h2>${data.avg}</h2>
                    <h3>${data.km}</h3>
                </li>
                <li>
                    <h2>${data.est}</h2>
                    <h3>${data.years}</h3>
                </li>
            </ul>
        </div><!-- __datas_maps -->
    `;
    _title_destination.innerHTML = data.title;
    _img_maps.src = data.img;
    _img_maps.alt = data.title;
    _info_destination.innerHTML = element;
}


// ------------------------------------------------------------------------------------
// MENU LINKS

function menu(page) {
    switch (page) {
        case "home":
            window.scroll({
                top: 0,
                behavior: "smooth",
            })
            break;

        case "destination":
            window.scroll({
                top: 0,
                behavior: "instant",
            })
            window.scroll({
                top: 940,
                behavior: "smooth",
            })
            break;

        case "crew":
            window.scroll({
                top: 0,
                behavior: "instant",
            })
            window.scroll({
                top: 1870,
                behavior: "smooth",
            })
            break;
        case "technology":
            window.scroll({
                top: 0,
                behavior: "instant",
            })
            window.scroll({
                top: 2820,
                behavior: "smooth",
            })
            break;
        default:
            window.scroll({
                top: 0,
                behavior: "smooth",
            })
            break;
    }
}