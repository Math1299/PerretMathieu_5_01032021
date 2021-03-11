//Initialisation du template
let template = document.querySelector("#product");

//Requête http fetch pour récupérer l'API
fetch("http://localhost:3000/api/cameras")
  .then((response) => response.json())
  .then((cameras) => {
    //Boucle for pour récupérer toutes les cameras
    for (let index = 0; index < cameras.length; index++) {
      //Création de la structure
      let ul = document.createElement("ul");
      ul.classList.add("list-group", "shadow", "w-100", "mb-2");
      template.appendChild(ul);

      let li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-around",
        "px-5"
      );
      ul.appendChild(li);

      //Ajout camImg
      let camImg = document.createElement("img");
      camImg.classList.add("rounded", "index");
      camImg.setAttribute("src", cameras[index].imageUrl);
      li.appendChild(camImg);

      //Ajout camName
      let camName = document.createElement("p");
      camName.classList.add("mt-4", "d-none", "d-sm-block", "font-weight-bold");
      camName.innerHTML = cameras[index].name;
      li.appendChild(camName);

      //Bouton avec lien voir le produit
      let btnCam = document.createElement("a");
      btnCam.classList.add(
        "btn",
        "btn-outline-primary",
        "btn-prod",
        "d-flex",
        "align-items-center"
      );
      btnCam.href = "pages/product.html?id=" + cameras[index]._id;
      btnCam.innerHTML = "Voir le produit";
      li.appendChild(btnCam);
    }
  })
  .catch((error) => console.log(error));
