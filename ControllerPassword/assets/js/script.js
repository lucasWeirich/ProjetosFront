// -----------------------------------------------------------------
// Variables Globais
let _listPassword = document.querySelector('.__result ul');
let _nameSearch = document.querySelector('form#search input[name="name"]');
let _nameAdd = document.querySelector('form#add input[name="name"]');
let _passwordAdd = document.querySelector('form#add input[name="password"]');
let _formAdd = document.querySelector('form#add');
let _formSearch = document.querySelector('form#search');

// -----------------------------------------------------------------
// Initialized
async function initialized() {
    let data = await getAllData()

    if (data) contructHTML(data);
}

// -----------------------------------------------------------------
// Function get all data save in db.json
async function getAllData() {
    const request = await fetch(`${_URL_BASE}sites?_sort=id&_order=desc`, {
        method: 'GET',
        header: _HEADERS
    });

    // Return
    return await request.json();
}

// -----------------------------------------------------------------
// Function build hmtl with the data
function contructHTML(sites) {
    _listPassword.innerHTML = '';

    sites.forEach(site => {
        let element = `
            <li>
                <span class="--name">${site.name}</span>
                <span onclick="copyPassword(this)" class="--password">${site.password}</span>
                <div class="__icons">
                    <span onclick="editSite(${site.id})" class="material-symbols-outlined">edit</span>
                    <span onclick="deleteSite(${site.id})" class="material-symbols-outlined">delete</span>
                </div>
            </li>
        `;

        _listPassword.innerHTML += element;
    });
}

// -----------------------------------------------------------------
// Function search site
_formSearch.addEventListener('submit', async function (e) {
    e.preventDefault();
    let search = _nameSearch.value;

    const request = await fetch(`${_URL_BASE}sites?name=${search}`, {
        method: 'GET',
        header: _HEADERS
    });
    const response = await request.json();
    contructHTML(response);
})


// -----------------------------------------------------------------
// Function add new site
_formAdd.addEventListener('submit', async function (e) {
    e.preventDefault();

    let newSite = {
        name: _nameAdd.value,
        password: _passwordAdd.value,
        lastPassword: "nenhum"
    }

    await fetch(`${_URL_BASE}sites`, {
        method: 'POST',
        header: _HEADERS,
        body: JSON.stringify(newSite)
    });
})

// -----------------------------------------------------------------
// Function edit site 
async function editSite(id) {
    let updateSite = {
        name: "teste",
        password: "testes",
        lastPassword: "last"
    }

    const request = await fetch(`${_URL_BASE}sites/${id}`, {
        method: 'PUT',
        header: _HEADERS,
        data: JSON.stringify(updateSite),
        
    });

    console.log(request.json())

    /* const response = await request.json(); */
}

// -----------------------------------------------------------------
// Function delete site
async function deleteSite(id) {
    await fetch(`${_URL_BASE}sites/${id}`, {
        method: 'DELETE',
        header: _HEADERS
    });
}

// -----------------------------------------------------------------
// Initialized
initialized();