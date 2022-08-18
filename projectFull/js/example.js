// ------------------------------------------------------
// Declaration variables global
const _form = document.getElementById('form-login');
const _user = document.getElementById('userName');
const _password = document.getElementById('password');


// ------------------------------------------------------
// Submit form
_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = checkInputs();

    if (login) {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'post',
            mode: 'cors',
            headers: API_HEADERS,
            body: JSON.stringify(login)
        });

        const body = await response.json();

        responseValidation(body);
    }
})

// ------------------------------------------------------
// Check Inputs
const checkInputs = () => {
    const userValue = _user.value.trim();
    const passwordValue = _password.value.trim();

    // Validation if not informed or undefined
    if (userValue === '' || userValue === undefined) {
        validationInput(_user, 'error');
        return;
    } validationInput(_user);
    if (passwordValue === '' || passwordValue === undefined) {
        validationInput(_password, 'error');
        return;
    } validationInput(_password);

    const dataLogin = {
        userName: userValue,
        password: passwordValue
    }

    return (dataLogin);
}

// ------------------------------------------------------
// Validation inputs
const validationInput = (input, error) => {
    const formControl = input.parentElement;

    if (error === 'error') {
        formControl.classList.add('--failed');
        return;
    }
    formControl.classList.remove('--failed')
    formControl.classList.add('--success');
}

// ------------------------------------------------------
// Validation response - fetch
const responseValidation = (res) => {
    const token = res.token;
    const msg = res.msg;

    if (token !== undefined) {
        sessionStorage.token = token;
        window.location = '../';
        return;
    }

    if (msg === 'Password incorrect!') {
        validationInput(_password, 'error');
        msg_error(msg);
        return;
    }

    
}