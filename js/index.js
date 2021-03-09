//Requête http fetch
function fetchData() {
  fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
    .then((data) => renderAllCameras(data));
}

//Fonction recupération des données pour les cameras
function renderAllCameras(data) {
  for (const camera of data) {
    if ("content" in document.createElement("template")) {
      const main = document.querySelector("#product-list"); //On pointe #product-list
      const template = document.querySelector("#product"); // On pointe #product
      const clone = document.importNode(template.content, true); // On assigne les selections
      const img = clone.querySelector("img");
      const name = clone.querySelector("p");
      const button = clone.querySelector("a");
      img.src = camera.imageUrl; // On indique les routes
      button.href = "pages/product.html?id=" + camera._id;
      name.innerHTML = camera.name;
      main.appendChild(clone); // On ajoute toutes les datas à "main"
      // console.log(camera);
      // console.log(main);
      // console.log(template);
      // console.log(clone);
      // console.log(img);
      // console.log(name);
      // console.log(button);
    }
  }
}

//Appel de la fonction
fetchData();
