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

// On selectionne le btn valider
// const sendForm = document.querySelector("#sendForm");
// console.log(sendForm);

// sendForm.addEventListener("click", (e) => {
//   e.preventDefault();

//   Récupération des data du formulaire
//   const dataSent = {
//     firstName: document.querySelector("#firstName").value,
//     lastName: document.querySelector("#lastName").value,
//     email: document.querySelector("#email").value,
//     zip: document.querySelector("#zip").value,
//     address: document.querySelector("#address").value,
//     city: document.querySelector("#city").value,
//     canton: document.querySelector("#canton").value,
//   };
//   On met cet objet dans le localStorage
//   localStorage.setItem("dataSent", JSON.stringify(dataSent));
//   stringify obj JS vers le format Json
// });
