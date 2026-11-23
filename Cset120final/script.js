let managerEmail = "pizzarequest@pizza.com";
let managerPassword = "PizzaRequest123";

let savedUsers = localStorage.getItem("users");
let users = [];
if (savedUsers !== null) {
    users = JSON.parse(savedUsers);
}

window.onload = function () {
    let isManager = localStorage.getItem("isManager");
    if (isManager === "yes") {
        showManagerButtons();
    }

    setupMenuButtons();
};

function signup() {
    let emailInput = document.getElementById("signupemail");
    let passwordInput = document.getElementById("signuppassword");

    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value;

    if (email === "" || password === "") {
        alert("Make sure to fill out both email and password.");
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            alert("That email is already signed up. Try logging in.");
            return;
        }
    }

    let newUser = {
        email: email,
        password: password
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please log in.");
    window.location.href = "login.html";
}

function login() {
    let emailInput = document.getElementById("loginemail");
    let passwordInput = document.getElementById("loginpassword");

    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value;

    if (email === "" || password === "") {
        alert("Make sure to fill out both email and password.");
        return;
    }

    let foundUser = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            foundUser = true;
            break;
        }
    }

    if (foundUser === true) {
        localStorage.setItem("isManager", "no");
        localStorage.setItem("currentUser", email);
        window.location.href = "menu.html";
    } else {
        alert("Email or Password is incorrect.");
    }
}

function managerLogin() {
    let email = document.getElementById("managerEmail").value.trim().toLowerCase();
    let password = document.getElementById("managerPassword").value;

    if (email === managerEmail && password === managerPassword) {
        localStorage.setItem("isManager", "yes");
        localStorage.removeItem("currentUser");
        window.location.href = "menu.html";
    } else {
        alert("Email or password are incorrect");
    }
}

function showManagerButtons() {
    let addPizza = document.getElementById("addPizza");
    let addDrinks = document.getElementById("addDrinks");
    let addSides = document.getElementById("addSides");
    let addTreats = document.getElementById("addTreats");

    let remove = document.querySelectorAll(".remove");
    if (remove[0]) {
        for (let i = 0; i < remove.length; i++) {
            remove[i].style.display = "block";
        }
    }

    if (addPizza) {
        addPizza.style.display = "inline-block";
    }
    if (addDrinks) {
        addDrinks.style.display = "inline-block";
    }
    if (addSides) {
        addSides.style.display = "inline-block";
    }
    if (addTreats) {
        addTreats.style.display = "inline-block";
    }
}

function setupMenuButtons() {
    let addPizza = document.getElementById("addPizza");
    let addDrinks = document.getElementById("addDrinks");
    let addSides = document.getElementById("addSides");
    let addTreats = document.getElementById("addTreats");

    let pizzaDiv = document.querySelector(".pizzaItems");
    let drinksDiv = document.querySelector(".drinkItems");
    let sidesDiv = document.querySelector(".sideItems");
    let treatsDiv = document.querySelector(".treatItems");

    if (addPizza && pizzaDiv) {
        addPizza.onclick = function () {
            addItemToSection(pizzaDiv);
        };
    }

    if (addDrinks && drinksDiv) {
        addDrinks.onclick = function () {
            addItemToSection(drinksDiv);
        };
    }

    if (addSides && sidesDiv) {
        addSides.onclick = function () {
            addItemToSection(sidesDiv);
        };
    }

    if (addTreats && treatsDiv) {
        addTreats.onclick = function () {
            addItemToSection(treatsDiv);
        };
    }
}

function addItemToSection(sectionDiv) {
    let name = prompt("Name of Item?");
    if (!name) {
        return;
    }

    let price = prompt('Price of Item? (make sure to start with "$")');
    if (!price) {
        return;
    }

    let imgurl = prompt("Enter a url for the image of the item you are adding");

    let newItem = document.createElement("div");
    newItem.innerHTML =
        '<img src="' + imgurl + '">' +
        "<p>" + name + "</p>" +
        "<p>" + price + "</p>" +
        '<button class="cartButton">Add to Cart</button>';

    sectionDiv.appendChild(newItem);
}