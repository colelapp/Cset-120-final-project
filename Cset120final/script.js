let managerPassword = "PizzaRequest123";
let managerEmail = "pizzarequest@pizza.com";

function managerLogin() {
    let email = document.getElementById("managerEmail");
    let password = document.getElementById("managerPassword");
    if (managerEmail === email.value && managerPassword === password.value) {
        addManagerButtons();
    } else {
        alert("Email or password are incorrect");
    }
}

function addMangerButtons() {

}


function login() {
    let name = prompt("please enter your name")
    console.log(name)
}