// -----------------------------------------------------------------
// Variables Globais API
const _URL_BASE = 'http://localhost:3000/';
const _HEADERS = 'Content-Type: application/json';

// -----------------------------------------------------------------
// Function copy password
function copyPassword(e) {
    navigator.clipboard.writeText(e.innerHTML)
        .then(() => {
            console.log("Password copied...")
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
}
