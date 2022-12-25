const modalWindowButton = document.getElementById("mdl-btn");
const submitButton = document.getElementById("sbm-btn");
const passwordInput = document.getElementById("frm-password");
const emailInput = document.getElementById("frm-email");
const usernameInput = document.getElementById("frm-username");
const passwordInputAgain = document.getElementById('frm-password-again');
const modalWindow = document.getElementById("form-modal-window");
const modalWindowOverlay = document.getElementById("form-modal-overlay");
const modalWindowErrorsList = document.getElementById("modal-window-list-of-errors");
const modalWindowErrorsListSpan = modalWindowErrorsList.querySelectorAll('span');

submitButton.addEventListener('click', passwordValidation);
modalWindowOverlay.addEventListener('click', overlayClick);

function passwordValidation(event) {
    let errorFlag = 0;
    const password = passwordInput.value;
    const passwordAgain = passwordInputAgain.value;
    const username = usernameInput.value;

    const emptyCase = /[^\s*$]/g;
   // const oneWordCase = /[^\/([a-z]+)]/g;
    if(username.match(emptyCase)) {
        modalWindowErrorsListSpan[0].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[0].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[0].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[0].classList.add("modal-window-list-item-invalid");
    }

    if (username.length <=18) {
        modalWindowErrorsListSpan[1].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[1].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[1].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[1].classList.add("modal-window-list-item-invalid");
    }

    const lowerCaseLetters = /[a-z]/g;
    if (password.match(lowerCaseLetters)) {
        modalWindowErrorsListSpan[2].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[2].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[2].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[2].classList.add("modal-window-list-item-invalid");
    }

    const upperCaseLetters = /[A-Z]/g;
    if(password.match(upperCaseLetters)) {
        modalWindowErrorsListSpan[3].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[3].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[3].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[3].classList.add("modal-window-list-item-invalid");
    }

    const specialCaseLetters = /(?=.*[!@#$%^&*_])/g;
    if (password.match(specialCaseLetters)) {
        modalWindowErrorsListSpan[4].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[4].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[4].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[4].classList.add("modal-window-list-item-invalid");
    }
    
    if(password.length >= 6 && password.length <=12) {
        modalWindowErrorsListSpan[5].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[5].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[5].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[5].classList.add("modal-window-list-item-invalid");
    }

    if (password === passwordAgain) {
        modalWindowErrorsListSpan[6].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[6].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[6].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[6].classList.add("modal-window-list-item-invalid");
    }

    const email = emailInput.value;
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) != false) {
        modalWindowErrorsListSpan[7].classList.remove("modal-window-list-item-invalid");
        modalWindowErrorsListSpan[7].classList.add("modal-window-list-item-valid");
    } else {
        errorFlag = true;
        modalWindowErrorsListSpan[7].classList.remove("modal-window-list-item-valid");
        modalWindowErrorsListSpan[7].classList.add("modal-window-list-item-invalid");
    }
    
    if (errorFlag) {
        modalWindow.style.visibility = 'visible';
        modalWindowOverlay.style.visibility = 'visible';
        event.preventDefault();
    }
}

function overlayClick() {
    modalWindow.style.visibility = 'hidden';
    modalWindowOverlay.style.visibility = 'hidden';
}
