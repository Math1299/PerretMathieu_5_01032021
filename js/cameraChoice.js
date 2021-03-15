//Initialisation
let cameraChoice = document.querySelector("#cameraChoice");
let choice = document.querySelector("#choice");
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

    //Ajout form qty
    let formQty = document.createElement("form");
    formQty.classList.add("form-inline", "w-50", "mx-auto", "my-2");
    qty.appendChild(formQty);

    //Ajout de label Qty
    let labelQty = document.createElement("label");
    labelQty.setAttribute("for", "qty");
    labelQty.innerHTML = "Quantité : ";
    formQty.appendChild(labelQty);

    //Ajout du 1er input Qty
    let secondInput = document.createElement("input");
    secondInput.classList.add("qty", "w-25", "ml-2", "text-center");
    secondInput.setAttribute("id", "result");
    secondInput.setAttribute("type", "number");
    secondInput.setAttribute("value", "1");
    labelQty.appendChild(secondInput);

    //Ajout de label
    let label = document.createElement("label");
    label.setAttribute("for", "lens");
    label.innerHTML = "Choix de l'objectif :";
    choice.appendChild(label);

    //Ajout de camOption
    let camOption = document.createElement("select");
    camOption.classList.add("form-control", "w-50", "mx-auto", "my-2");
    camOption.setAttribute("name", "lens");
    camOption.setAttribute("id", "option");
    label.appendChild(camOption);

    //Ajout de lensOption
    let lensOption = document.createElement("option");
    lensOption.setAttribute("disabled", "disabled");
    lensOption.setAttribute("selected", "true");
    // lensOption.setAttribute("value", [camera.lenses]);
    lensOption.textContent = "Veuillez selectionner un objectif";
    camOption.appendChild(lensOption);

    //Boucle for pour récupérer les options
    for (let i = 0; i < camera.lenses.length; i++) {
      let camLens = document.createElement("option");
      camOption.classList.add("choice");
      camOption.appendChild(camLens);
      camLens.setAttribute("value", [camera.lenses[i]]);
      camLens.textContent = camera.lenses[i];
    }

    //Ajout du btn ajouter au panier
    let btnAddToCart = document.createElement("a");
    btnAddToCart.classList.add(
      "btn",
      "btn-outline-primary",
      "w-25",
      "mx-auto",
      "mb-2"
    );
    // btnAddToCart.setAttribute("href", "cart.html");
    btnAddToCart.setAttribute("id", "panier");
    btnAddToCart.innerHTML = "Ajouter au panier";
    choice.appendChild(btnAddToCart);

    //A l'écoute du click sur le bouton ajouter au panier pour comptabiliser

    // Fonction addToCart
    btnAddToCart.onclick = function () {
      let select = document.querySelector("select");
      let lensChoice = select.value;
      let result = secondInput.value;

      if (lensChoice === lensOption.value) {
        alert("Vous devez choisir un objectif !");
      } else {
        let intoCart = {
          id: camera._id,
          name: camera.name,
          price: camera.price / 100,
          description: camera.description,
          imageUrl: camera.imageUrl,
          lens: lensChoice,
          qty: result,
        };
        let camToCart = JSON.stringify(intoCart); //stringify obj JS vers le format Json
        localStorage.setItem(camera._id, camToCart);
        alert("Ajouté au panier");
      }
    };
  })
  .catch((error) => console.log(error));
