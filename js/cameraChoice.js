const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetchData(id);

function fetchData(id) {
  fetch("http://localhost:3000/api/cameras/" + id)
    .then((response) => response.json())
    .then((data) => chosenCamera(data));
}

//Fonction camOption pour les différentes options de lens selon l'appareil choisi
function camOption(lens) {
  //On vise "select"
  let choiceOfLens = document.querySelector("select");
  //On crée "option" et le texte à joindre
  const option = document.createElement("option");
  const optionTxt = document.createTextNode(lens);
  //On les lie
  option.appendChild(optionTxt);
  //on recupère/ajoute les valeurs
  option.setAttribute("value", lens);
  choiceOfLens.appendChild(option);
}
//Fonction pour le remplissage des champs en fonction de l'appareil selectionné
function chosenCamera(camera) {
  //Récupération des datas
  document.querySelector(".card-img-top").src = camera.imageUrl;
  document.querySelector(".card-title").innerHTML = camera.name;
  document.querySelector(".card-subtitle").innerHTML = camera.price + " CHF";
  document.querySelector(".card-text").innerHTML = camera.description;
  //Boucle for pour les différentes options de lens en fonction de l'appareil
  for (let i = 0; i < camera.lenses.length; i++) {
    camOption(camera.lenses[i]);
  }
  //A l'écoute du click sur le bouton ajouter au panier pour comptabiliser
  document.querySelector(".btn").addEventListener("click", function () {
    addToCart();
  });
}
function addToCart() {}
