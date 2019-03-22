const signUpButton = document.querySelector('#signup-btn');
const logInOptions = document.querySelector('.is-hidden');
const p = document.querySelector('.p');
const welcome = document.querySelector('.welcome');
let signUpButtonAria = document.querySelector('#signup-btn').getAttribute('aria-expanded');
const emailReveal = document.querySelector('.email-reveal');
const emailHide = document.querySelector('.email-hide');
const articleHide = document.querySelector('.a');



document.addEventListener('DOMContentLoaded', () => {
   
    signUpButton.addEventListener('click', function () {
    p.classList.toggle('no-p');
        welcome.classList.toggle('no-p');
        logInOptions.classList.toggle('is-seen');
        signUpButton.setAttribute('aria-expanded', toggleAriaSignUp());
    });

    emailReveal.addEventListener('click', () => {
        emailHide.classList.toggle('email-show');
        articleHide.classList.toggle('will-hide');
    });
    
});


function toggleAriaSignUp() {
    if(signUpButtonAria == 'true' ) {
       return signUpButtonAria = 'false';
    } 
    return signUpButtonAria = 'true'
};



document.querySelector('#btnSignup').addEventListener('click', () => {
    const email = document.querySelector('#txtEmail').value;
    const password = document.querySelector('#txtPassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.message);
    });
});

document.querySelector('#btnLogin').addEventListener('click', () => {
    const email = document.querySelector('#txtEmail').value;
    const password = document.querySelector('#txtPassword').value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.catch(function(error) {console.log(error.message);});
});

document.querySelector('.fb-login').addEventListener('click', ()=> {
    const provider = new firebase.auth.FacebookAuthProvider();
    const promise = firebase.auth().signInWithPopup(provider);
    promise.then(result => console.log(result))
           .catch(error => console.log(error));
});

firebase.auth().onAuthStateChanged(user => user && (window.location = "product.html"));
    
