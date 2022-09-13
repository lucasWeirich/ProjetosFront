const _cidade = document.getElementById("data-cep");
const input = document.getElementById("cep");
const load = document.getElementById("load");

function getCep() {
    let cep = input.value;

    if (cep.length === 8) {
        load.classList.add("active");
        request(cep);
    }
}

async function request(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const body = await response.json();

    tratamentErros(body);
}

function viewResponse(i) {
    let element = `
        CEP: ${i.cep} <br>
        ${i.logradouro ? `Logradouro: ${i.logradouro} <br>` : ''}
        ${i.complemento ? `Complemento: ${i.complemento} <br>` : ''}
        ${i.bairro ? `Bairro: ${i.bairro} <br>` : ''}
        ${i.localidade ? `Localidade: ${i.localidade} <br>` : ''}
        ${i.uf ? `Estado: ${i.uf} <br>` : ''}
        ${i.ibge ? `IBGE: ${i.ibge} <br>` : ''}
        ${i.ddd ? `DDD: ${i.ddd} <br>` : ''}
    `;

    _cidade.innerHTML = element;
    load.classList.remove("active");
}

function tratamentErros(data) {

    if (data.erro) {
        _cidade.innerHTML = "";
        input.value = '';
        alert("CEP não encontrado no banco de dados");
        load.classList.remove("active");
        return;
    }

    viewResponse(data);
}