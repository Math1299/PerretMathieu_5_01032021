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

  th.innerHTML = nb++;
  name.innerHTML = camera.name;
  price.innerHTML = camera.price;
  lens.innerHTML = camera.lens;

  table.appendChild(newLine);

  totalPrice += camera.price;

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

// On crée l'objet client suite au click sur valider
const sendForm = document.querySelector("#sendForm");
sendForm.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();

  //vérification de tous les champs qui sont required
  if (
    !document
      .querySelector("#firstName")
      .value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/)
  ) {
    alert("Le champs prénom contient des erreurs");
    window.location = "cart.html";
  }
  if (
    !document
      .querySelector("#lastName")
      .value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/)
  ) {
    alert("Le champs nom contient des erreurs");
    window.location = "cart.html";
  }
  if (
    !document
      .querySelector("#address")
      .value.match(/^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/)
  ) {
    alert("Le champs contient des erreurs");
    window.location = "cart.html";
  }
  if (
    !document
      .querySelector("#city")
      .value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/)
  ) {
    alert("Le champs  ville contient des erreurs");
    window.location = "cart.html";
  }
  if (
    !document
      .querySelector("#email")
      .value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    alert("Le champs contient des erreurs");
    window.location = "cart.html";
  }

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
