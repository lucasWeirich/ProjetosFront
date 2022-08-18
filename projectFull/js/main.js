// ------------------------------------------------------
// Declaration variables global
const _sun = document.getElementById('select-sundlinght');
const _water = document.getElementById('select-water');
const _toxicity = document.getElementById('select-chew');
const _selects = document.querySelectorAll('.selects');

// Validation if all selecteds
const validationSelecteds = () => {
    if (_sun.value && _water.value && _toxicity.value) {
        const data = objectSelects();
        request(data);
    }
}

// Create object of the values selects
const objectSelects = () => {
    const sunValue = _sun.value;
    const waterValue = _water.value;
    const toxicityValue = _toxicity.value;

    const data = {
        sun: sunValue,
        water: waterValue,
        pets: toxicityValue
    }
    return data;
}

// Make a request
const request = async (data) => {
    const response = await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${data.sun}&water=${data.water}&pets=${data.pets}`);
    const resultJSON = await response.json();

    if (resultJSON) {
        document.getElementById('list_favorites').innerHTML = '';
        resultJSON.forEach(plant => {
            createHtmlPlants(plant);
        });

        appearContentResult();
        nextBottom();
    }
}

// Create html of alls Plants
const createHtmlPlants = (plant) => {
    const html = document.getElementById('list_favorites');

    html.innerHTML += `
        <div class="__item ${plant.staff_favorite === true ? "--favorite" : ""}">
            <div class="image"><img
                    src="${plant.url}" alt="${plant.name}"></div>

            <h3>${plant.name}</h3>

            <div class="informations">
                <div class="price">
                    <span>$${plant.price}</span>
                </div>
                <div class="details">
                    <span class="toxicity --${plant.toxicity}"></span>
                    <span class="sun --${plant.sun}"></span>
                    <span class="water --${plant.water}"></span>
                </div>
            </div><!-- information -->
        </div><!-- __item -->
    `;
}

/* 
    =====================================
    FUNCTIONS GERAIS OF PROJECT
    =====================================
*/

// Function scroll bottom
function nextBottom() {
    window.scroll({
        top: 500    ,
        behavior: "smooth"
    
    })
}
// Function scroll bottom
function backTop() {
    window.scroll({
        top: 0,
        behavior: "smooth",
    })
    appearContentNotFound();
}

// Function for hidden content not found and appear content result 
const appearContentResult = () => {
    controllerHiddenAppear("content_result");
}

// Function for hidden content not found and appear content result 
const appearContentNotFound = () => {
    controllerHiddenAppear("not_found");
}

// Function for controller hidden and appear of content html
const controllerHiddenAppear = (txt) => {
    const contentResult = document.getElementById('content_result').classList;
    const contentNotFound = document.getElementById('not_found').classList;

    if (txt === "content_result") {
        contentNotFound.add('--hidden');
        contentResult.remove('--hidden');
        return;
    }

    contentResult.add('--hidden');
    contentNotFound.remove('--hidden');
}