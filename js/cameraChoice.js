//Initialisation
let cameraChoice = document.querySelector("#cameraChoice");
let option = document.querySelector("#option");

//Récupération de l'ID

const queryString = window.location.search; //On récupère la chaîne de requête à partir de l'URL
const urlParams = new URLSearchParams(queryString); //On extrait toute const spécifique
const id = urlParams.get("id"); //on récupère les id

fetch("http://localhost:3000/api/cameras/" + id)
  .then((response) => response.json())
  .then((camera) => {
    //Insertion de camImg
    let camImg = document.createElement("img");
    camImg.classList.add("card-img-top", "rounded", "w-75", "mx-auto", "mt-5");
    camImg.setAttribute("src", camera.imageUrl);
    cameraChoice.appendChild(camImg);

    //Création de la div
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cameraChoice.appendChild(cardBody);

    //Ajout de camName
    let camName = document.createElement("h2");
    camName.classList.add("card-title");
    camName.innerHTML = camera.name;
    cardBody.appendChild(camName);

    //Ajout de camPrice
    let camPrice = document.createElement("h4");
    camPrice.classList.add("card-subtitle", "my-1");
    camPrice.innerHTML = `${camera.price / 100} CHF`;
    camName.appendChild(camPrice);

    //Ajout de camDesctiption
    let camDescription = document.createElement("p");
    camDescription.classList.add(
      "card-text",
      "text-justify",
      "font-weight-light",
      "w-75",
      "mx-auto",
      "my-2"
    );
    camDescription.innerHTML = camera.description;
    camPrice.appendChild(camDescription);

    //Ajout de lensOption
    let lensOption = document.createElement("option");
    lensOption.setAttribute("disable", "disable");
    lensOption.setAttribute("selected", "true");
    lensOption.setAttribute("value", "0");
    lensOption.textContent = "Veuillez selectionner un objectif";
    option.appendChild(lensOption);

    //Boucle for pour récupérer les options
    for (let i = 0; i < camera.lenses.length; i++) {
      let camLens = document.createElement("option");
      option.classList.add("choice");
      option.appendChild(camLens);
      camLens.setAttribute("value", 1);
      camLens.textContent = camera.lenses[i];
    }
  });
