//Récupération du localStorage en format JSON vers du JS
const cartItems = JSON.parse(localStorage.getItem("cameras")); //.parse de Json vers obj JS
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
//---------------------- Remplissage du panier avec les données récupérées

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
  lens.innerHTML = cartItems[nb - 1]["lens"]; //index [] commence à 0

  table.appendChild(newLine);

  totalPrice += camera.price;
  document.querySelector("h5").innerText = `TOTAL : ${totalPrice / 100} CHF`;
  // console.log(table); // console.log(tr);
  // console.log(th);// console.log(name);// console.log(price);
  // console.log(lens); // console.log(supp);
}

//-----------------------------------Vider le panier--------------------------------
//Ajout du btn vider le panier
// let contBtn = document.querySelector(".panierContainerBtEmptyCart");
// let btnEmptyCart = document.createElement("button");
// btnEmptyCart.classList.add("btn", "btn-danger", "btn-block");
// btnEmptyCart.setAttribute("type", "reset");
// btnEmptyCart.setAttribute("id", "btnEmptyCart");
// btnEmptyCart.innerHTML = "Vider le panier";
// contBtn.appendChild(btnEmptyCart);

//Création du bouton a envoyer dans le HTML
const btnEmptyCart = `<button type="reset"class="btn btn-danger btn-block"id="btnEmptyCart">Vider le panier</button>`;

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

//On selectionne le btn valider
const sendForm = document.querySelector("#sendForm");
console.log(sendForm);

sendForm.addEventListener("click", (e) => {
  e.preventDefault();

  //Récupération des data du formulaire
  const dataSent = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    email: document.querySelector("#email").value,
    zip: document.querySelector("#zip").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    canton: document.querySelector("#canton").value,
  };
  //On met cet objet dans le localStorage
  localStorage.setItem("dataSent", JSON.stringify(dataSent));
  //stringify obj JS vers le format Json
});
