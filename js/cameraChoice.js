//On récupère la chaîne de requête à partir de l'URL
const queryString = window.location.search;
//On extrait toute const spécifique
const urlParams = new URLSearchParams(queryString);
//on récupère les id
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

function addToCart() {
  let add = false;
  let choiceOfLens = document.querySelector("select");
  let cameras = [];
  let storage = JSON.parse(localStorage.getItem("cameras"));

  if (storage) {
    for (let i = 0; i < storage.length; i++) {
      if (storage[i]["id"] == id && storage[i]["lense"] == choiceOfLens.value) {
        add = true;
      }
    }
    if (add == false) storage.push({ id: id, lense: choiceOfLens.value });
    cameras = storage;
    add = false;
  } else {
    cameras.push({ id: id, lense: choiceOfLens.value });
  }
  localStorage.setItem("cameras", JSON.stringify(cameras));
}
