import AuthService from './authService';

const auth = new AuthService();

const refs = {
    btnOpenModalAuthentication: document.querySelector('.btn-authentication'),
    btnClose: document.querySelector('[data-modal-window-close-authentication]'),
    backdrop: document.querySelector('[data-modal-backdrop-authentication]'),
    txtEmail: document.querySelector('#txtEmail'),
    txtPassword: document.querySelector('#txtPassword'),
    btnLogin: document.querySelector('#btnLogin'),
    btnSignUp: document.querySelector('#btnSignUp'),
    btnLogout: document.querySelector('#btnLogout'),
    greeting: document.querySelector('.greeting-authentication'),
};

refs.btnOpenModalAuthentication.addEventListener('click', onBtnAuthenticationClick);
refs.backdrop.addEventListener('click', onClickBackdrop);
refs.btnClose.addEventListener('click', onClickBtnClose);

refs.btnLogin.addEventListener('click', onClickbtnLogin);
refs.btnSignUp.addEventListener('click', onClickbtnSignUp);
refs.btnLogout.addEventListener('click', onClicbtnLogout);

function onBtnAuthenticationClick() {
    refs.backdrop.classList.add('is--open');
}
function onClickBackdrop(evt) {
    if (evt.currentTarget === evt.target) {
      onClickBtnClose();
    }
}
function onClickBtnClose() {
    refs.backdrop.classList.remove('is--open');
}

function onClickbtnLogin() {
    const email = txtEmail.value;
    const password = txtPassword.value;
    
    auth.signIn(email, password)
        .then(isAuthenticated => {
            if (isAuthenticated) {
                successfulLogin();
            } else {
                refs.txtEmail.value = '';
                refs.txtPassword.value = '';
            }
        });
}

function onClickbtnSignUp() {
    const email = txtEmail.value;
    const password = txtPassword.value;
    
    auth.signUp(email, password)
        .then(isAuthenticated => {
            if (isAuthenticated) {
                successfulLogin();
            } else {
                refs.txtEmail.value = '';
                refs.txtPassword.value = '';
            }
        });
}

function onClicbtnLogout() {
    refs.greeting.textContent = '';
    refs.txtEmail.value = '';
    refs.txtPassword.value = '';
    refs.btnLogin.classList.remove('disabled-btn');
    refs.btnSignUp.classList.remove('disabled-btn');
    refs.txtEmail.classList.remove('disabled-btn');
    refs.txtPassword.classList.remove('disabled-btn');
    refs.btnOpenModalAuthentication.textContent = 'Sign UP | Log in';
    refs.btnLogout.classList.add('disabled-btn');
    auth.logOut();
}

function successfulLogin() {
    refs.btnOpenModalAuthentication.textContent = 'Hi, our frend!';
    refs.greeting.textContent = 'Welcom, our frend!';

    refs.btnLogin.classList.add('disabled-btn');
    refs.btnSignUp.classList.add('disabled-btn');
    refs.txtEmail.classList.add('disabled-btn');
    refs.txtPassword.classList.add('disabled-btn');
    refs.btnLogout.classList.remove('disabled-btn');
}