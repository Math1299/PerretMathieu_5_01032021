//Tableau vide afin de récupérer les données
let pdId = [];

//Compteur du nombre de produits dans la panier
let nb = 1;

//Variable totalPrice
let totalPrice = 0;

// Récupération du localStorage en format JSON
let camToCart = Object.keys(localStorage);

for (let j = 0; j < camToCart.length; j++) {
  let camera = JSON.parse(localStorage.getItem(camToCart[j]));

  //Création et ajout des nouvelles lignes du tableau
  let table = document.querySelector("table");
  let newLine = document.createElement("tbody");
  let tr = newLine.appendChild(document.createElement("tr"));
  let th = tr.appendChild(document.createElement("th"));
  let name = tr.appendChild(document.createElement("td"));
  let price = tr.appendChild(document.createElement("td"));
  let lens = tr.appendChild(document.createElement("td"));
  let qty = tr.appendChild(document.createElement("td"));

  th.innerHTML = nb++;
  name.innerHTML = camera.name;
  price.innerHTML = camera.price;
  lens.innerHTML = camera.lens;
  qty.innerHTML = camera.qty;

  table.appendChild(newLine);

  totalPrice = totalPrice + camera.price * camera.qty;

  document.querySelector("h5").innerText = `TOTAL : ${totalPrice} CHF`;

  //Push Id de camera dans le tableau pdID
  pdId.push(camera.id);
  // console.log(typeof camera.price);
  // console.log(typeof camera.name);
  // console.log(typeof camera.lens);
}

// -----------------------------------Vider le panier--------------------------------

// Création du bouton a envoyer dans le HTML
const btnEmptyCart = `<button type="reset"class="btn btn-danger btn-block"id="btnEmptyCart">Vider le panier</button>`;

// Insertion du bouton dans le HTML
panierContainerRecap.insertAdjacentHTML("beforeend", btnEmptyCart);

const del = document.querySelector("#btnEmptyCart");
// console.log(del);

// Suppression key du localStorage pour vider le panier

del.addEventListener("click", (e) => {
  e.preventDefault;

  localStorage.clear();
  alert("Le panier va être vidé");

  document.location.reload();
});
console.log(camToCart);

// -------------------------FORMULAIRE-----------------------------------

//On crée la Class client
class Client {
  constructor(firstName, lastName, email, address, city) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.email = email),
      (this.address = address),
      (this.city = city);
  }
}

//Verification de la validité des données avec une expression réguliète RegExp

const form = document.querySelector("#form");

// --------------------- FIRSTNAME -----------------------------------

//On écoute les modifications du prénom
form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

const validFirstName = function (inputFirstName) {
  //Création de la RegExp pour validation du prénom
  let firstNameRegExp = new RegExp(/^([a-zA-Zàâäéèêëïîôöùûüç']+)$/);
  //On pointe la balise small
  let small = inputFirstName.nextElementSibling;

  //Teste du RegExp

  if (firstNameRegExp.test(inputFirstName.value)) {
    small.innerHTML = "Prénom valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Prénom non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// --------------------- LASTNAME -----------------------------------

//On écoute les modifications du NOM
form.lastName.addEventListener("change", function () {
  validLastName(this);
});

const validLastName = function (inputLastName) {
  //Création de la RegExp pour validation du nom
  let lastNameRegExp = new RegExp(/^([a-zA-Zàâäéèêëïîôöùûüç']+)$/);
  //On pointe la balise small
  let small = inputLastName.nextElementSibling;

  //Teste du RegExp

  if (lastNameRegExp.test(inputLastName.value)) {
    small.innerHTML = "Nom valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Nom non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// --------------------- EMAIL -----------------------------------

//On écoute les modifications du prénom
form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  //Création de la RegExp pour validation du prénom
  let emailRegExp = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
  );
  //On pointe la balise small
  let small = inputEmail.nextElementSibling;

  //Teste du RegExp

  if (emailRegExp.test(inputEmail.value)) {
    small.innerHTML = "Email valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Email non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// --------------------- ADDRESS -----------------------------------

//On écoute les modifications de Adresse
form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAddress) {
  //Création de la RegExp pour validation du nom
  let addressRegExp = new RegExp(
    /^[0-9]+ [a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/
  );
  //On pointe la balise small
  let small = inputAddress.nextElementSibling;

  //Teste du RegExp

  if (addressRegExp.test(inputAddress.value)) {
    small.innerHTML = "Adresse valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Adresse non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// --------------------- Ville -----------------------------------

//On écoute les modifications de la ville
form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  //Création de la RegExp pour validation de la ville
  let cityRegExp = new RegExp(/^([a-zA-Zàâäéèêëïîôöùûüç']+)$/);
  //On pointe la balise small
  let small = inputCity.nextElementSibling;

  //Teste du RegExp

  if (cityRegExp.test(inputCity.value)) {
    small.innerHTML = "Ville valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Ville non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// const sendForm = document.querySelector("#sendForm");}

// On crée l'objet client suite au click sur valider

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // localStorage.clear();

  //vérification de tous les champs qui sont required

  //Création du client
  e.preventDefault();
  let newOrder = new Client(
    document.querySelector("#firstName").value,
    document.querySelector("#lastName").value,
    document.querySelector("#email").value,
    document.querySelector("#address").value,
    document.querySelector("#city").value
  );
  //Création de l'objet résultat
  let data = {
    contact: {
      firstName: newOrder.firstName,
      lastName: newOrder.lastName,
      email: newOrder.email,
      address: newOrder.address,
      city: newOrder.city,
    },
    products: pdId,
  };

  //Appel de fecth contenant la commande
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    //Réponse du serveur
    .then((response) => response.json())
    .then((response) => {
      localStorage.clear();
      let objOrder = {
        idOrder: response.orderId,
        price: totalPrice,
      };
      let order = JSON.stringify(objOrder);
      localStorage.setItem("order", order);
      window.location = "confirmation.html";
    });
});
