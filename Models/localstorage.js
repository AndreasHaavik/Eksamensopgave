/*----------
const rememberDiv = document.querySelector('.input'); 
//const forgetDiv = document.querySelector('.terms'); 
const form = document.querySelector('form');
const nameInput = document.querySelector('#nameInput');
const lastNameInput = document.querySelector('#lastNameInput');
const addressInput = document.querySelector('#addressInput');
const genderInput = document.querySelector('#genderInput');
const interestInput = document.querySelector('#interestInput');
const emailInput = document.querySelector('#emailInput');
const passWordInput = document.querySelector('#passWordInput');
const fileInput = document.querySelector('#fileInput');
//const submitItem = document.querySelector('#submitImage')
const submitAll = document.querySelector('#signEverything-btn')
----------*/
 
/*------
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById('lastNameInput');
const submitImage = document.getElementById('submitImage');

signEverything.onclick = function(){
    const name = nameInput.value;
    const lastName = lastNameInput.value;

    console.log(name)
    console.log(lastName)
}
------*/

/*----------
form.addEventListener('submit', function(e){
    e.preventDefault();
});

submitBtn.addEventListener('click', function(){
    localStorage.setIem('image', fileInput.value)
})

submitAll.addEventListener('click', function(){
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('lastName', lastNameInput.value);
    localStorage.setItem('address', addressInput.value);
    localStorage.setItem('gender', genderInput.value);
    localStorage.setItem('interest', interestInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('passWord', passWordInput.value);
}) 
--------*/

const nameInput = document.querySelector('#nameInput');
const submit = document.querySelector('.signUp-btn'); 

form.addEventlistener('submit', function(e){
    e.preventDefault();
});

const saveToLocalStorage = () => {
    localStorage.setItem('textinput', nameInput.value)
}

submit.addEventListener('click', saveToLocalStorage)

