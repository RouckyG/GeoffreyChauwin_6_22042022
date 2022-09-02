const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

document.addEventListener("keydown",(event)=>{event.key === "Escape" ? closeModal() : ""})
document.querySelector("#modal_closeButton").addEventListener("keydown",(event)=>{event.key === "Enter" ? closeModal() : ""});

function displayModal() {
    setTimeout(()=>{firstName.focus()},100);

    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    setTimeout(()=>{document.querySelector(".contact_button").focus()},100);

    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// check if the name (first name or last name) is a valid name
function isNameValid(name, nameError) {

    // start with a word of 2 or more characters followed (or not) by a special character and another word
    const regex = /^[a-z]{2,}([ ,.'-]?\w+)$/i;
    let isValid = true;

    if (!name.value.match(regex)){
        isValid = false;
    
        nameError.style.display='block';
        name.style.border = "1px solid red";
    }
    else {
        nameError.style.display='none';
        name.style.border = "none";
    }

    return isValid
}

function isEmailValid(email, emailError) {

    // un mot au debut (+ . ou - + un mot) + @ + un mot (+ . ou - et un mot) + . + un mot de 2 ou 3 lettres a la fin.
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isValid = true;

    if (!email.value.match(regex)){
        isValid = false;
        emailError.style.display='block';
        email.style.border = "1px solid red";
    }
    else {
        emailError.style.display='none';
        email.style.border = "none";
    }

    return isValid
}

function isMessageValid(message, messageError) {

    // une lettre au début puis au moins 9 caractères
    const regex = /^[a-z]+[a-z0-9 ,.:!?/'-]{9,}$/i;
    let isValid = true;

    if (!message.value.match(regex)){
        isValid = false;
    
        messageError.style.display='block';
        message.style.border = "1px solid red";
    }
    else {
        messageError.style.display='none';
        message.style.border = "none";
    }

    return isValid
}

function submitAnswers(event) {
    
    if(isNameValid(firstName, firstNameError) && isNameValid(lastName, lastNameError) && isEmailValid(email, emailError) && isMessageValid(message,messageError))
    {
        console.log("firstName", firstName.value);
        console.log("lastName", lastName.value);
        console.log("email", email.value);
        console.log("message", message.value);
        document.querySelector("#contact_form").reset();
        closeModal();
    }
}

document.getElementById("submit_button").addEventListener("click", (event) => {
    // Evite le comportement par défaut (envoie du formulaire)
    event.preventDefault()

    submitAnswers(event)

})