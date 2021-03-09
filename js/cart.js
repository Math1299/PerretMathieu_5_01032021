//Récupération du localStorage en format JSON vers du JS
const cartItems = JSON.parse(localStorage.getItem("cameras"));
// console.log(cartItems);

//Ajout des données du localStorage tant qu'il y en a
if (cartItems) {
  for (let i = 0; i < cartItems.length; i++) {
    fetchData(cartItems[i]["id"]);
  }
}

function fetchData(id) {
  fetch("http://localhost:3000/api/cameras/" + id)
    .then((response) => response.json())
    .then((data) => intoCart(data));
}
// Remplissage du panier avec les données récupérées

let nb = 0;
let totalPrice = 0;

function intoCart(camera) {
  nb = nb + 1;
  let table = document.querySelector("table");
  let newLine = document.createElement("tbody");
  let tr = newLine.appendChild(document.createElement("tr"));
  let th = tr.appendChild(document.createElement("th"));
  let name = tr.appendChild(document.createElement("td"));
  let price = tr.appendChild(document.createElement("td"));
  let lens = tr.appendChild(document.createElement("td"));

  th.innerHTML = nb;
  name.innerHTML = camera.name;
  price.innerHTML = `${camera.price / 100} CHF`;
  lens.innerHTML = cartItems[nb - 1]["lens"];

  table.appendChild(newLine);

  totalPrice += camera.price;
  document.querySelector("h5").innerText = `TOTAL : ${totalPrice / 100} CHF`;
  // console.log(table);
  // console.log(tr);
  // console.log(th);
  // console.log(name);
  // console.log(price);
  // console.log(lens);
  // console.log(supp);
}

//-----------------------------------Vider le panier--------------------------------

//Création du bouton a envoyer dans le HTML
const btnEmptyCart = `<button type="reset"class="btn btn-danger btn-block"id="btnEmptyCart">Vider la panier</button>`;

//Insertion du bouton dans le HTML
panierContainerRecap.insertAdjacentHTML("beforeend", btnEmptyCart);

const del = document.querySelector("#btnEmptyCart");
// console.log(del);

//Suppression de la key 'cameras' du localStorage pour vider le panier

del.addEventListener("click", (e) => {
  e.preventDefault;

  localStorage.removeItem("cameras");

  alert("Le panier va être vidé");

  document.location.reload();
});

//-------------------------FORMULAIRE-----------------------------------
