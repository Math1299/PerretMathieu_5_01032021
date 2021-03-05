const queryString = window.location.search; //On récupère la chaîne de requête à partir de l'URL
const urlParams = new URLSearchParams(queryString); //On extrait toute const spécifique
const id = urlParams.get("id"); //on récupère les id

fetchData(id);

function fetchData(id) {
  fetch("http://localhost:3000/api/cameras/" + id)
    .then((response) => response.json())
    .then((data) => chosenCamera(data));
}

//Fonction camOption pour les différentes options de lens selon l'appareil choisi

function camOption(lens) {
  let choiceOfLens = document.querySelector("select"); //On vise "select"
  const option = document.createElement("option"); //On crée "option" et le texte à joindre
  const optionTxt = document.createTextNode(lens);
  option.appendChild(optionTxt); //On les lie
  option.setAttribute("value", lens); //on recupère/ajoute les valeurs
  choiceOfLens.appendChild(option);
}

//Fonction pour le remplissage des champs en fonction de l'appareil selectionné

function chosenCamera(camera) {
  //Récupération des datas
  document.querySelector(".card-img-top").src = camera.imageUrl;
  document.querySelector(".card-title").innerHTML = camera.name;
  document.querySelector(".card-subtitle").innerHTML = `${
    camera.price / 100
  } CHF`;
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

//La fonction addToCArt

function addToCart() {
  let inCart = false; //De base le panier vide
  let choiceOfLens = document.querySelector("select"); //On vise la selection
  let cameras = []; //Le tableau contenant les infos du produits de base
  let storage = JSON.parse(localStorage.getItem("cameras")); //On stock les données

  //Conditions pour le stockage
  if (storage) {
    for (let i = 0; i < storage.length; i++) {
      //Itération des options possibles
      if (storage[i]["id"] == id && storage[i]["lens"] == choiceOfLens.value) {
        inCart = true;
      }
    }
    if (inCart == false) storage.push({ id: id, lens: choiceOfLens.value });
    cameras = storage;
    inCart = false;
  } else {
    cameras.push({ id: id, lens: choiceOfLens.value });
  }
  localStorage.setItem("cameras", JSON.stringify(cameras));
}
