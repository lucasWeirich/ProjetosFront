// -----------------------------------------------------------------
// Declaration variables Global
const resultPassword = document.getElementById("password");
const viewLenght = document.getElementById("lenght_password");
const numLenght = document.getElementById("numLenght");
const typeSelected = document.querySelectorAll("input[class='type_password']")
const typePassword = {
    lowercase: 'abcdefghijklmnopqrstuvwxyzç',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ',
    numbers: '1234567890',
    symbols: "!@#$%¨&*()_+=-`´~^/?;:.,\|'ºª[{}]"
}

// -----------------------------------------------------------------
// View lenght password for generator
numLenght.addEventListener('change', () => {
    viewLenght.innerHTML = numLenght.value;
})

// -----------------------------------------------------------------
// Function get type of characteres for generator password
function generatorPassword() {
    let characteres = validationTypes();
    let lenght = numLenght.value;
    let password = '';

    for (let i = 1; i <= lenght; i++) {
        let x = Math.floor(Math.random() * lenght);
        characteres = shuffleCharacters(characteres);
        password += characteres.slice(x, (x + 1));
    }

    resultPassword.innerHTML = password;
}

// -----------------------------------------------------------------
// Function validation of type selected for generator password
function validationTypes() {
    let types = '';

    typeSelected.forEach(item => {
        if (item.checked) {
            types += returnType(item.value);
        }
    });

    return types.split('');
}

// -----------------------------------------------------------------
// Function shuffle characteres for generator new password
function shuffleCharacters(item) {
    let randomNumber;
    let tmp;

    for (let i = item.length; i;) {
        randomNumber = Math.random() * i-- | 0;
        tmp = item[randomNumber];
        item[randomNumber] = item[i];
        item[i] = tmp;
    }

    return item;
}

// -----------------------------------------------------------------
// Function return type of password selected
function returnType(type) {
    switch (type) {
        case 'lowercase':
            return typePassword.lowercase;

        case 'uppercase':
            return typePassword.uppercase;

        case 'numbers':
            return typePassword.numbers;

        case 'symbols':
            return typePassword.symbols;

        default:
            alert("Selecione pelo menos 1 opção para ser gerada a senha!")
            break;
    }
}

// -----------------------------------------------------------------
// Function copy password
function copyPassword() {
    navigator.clipboard.writeText(resultPassword.innerHTML)
        .then(() => {
            alert("Password copied...")
        })
        .catch(err => {
            alert('Something went wrong', err);
        })
}