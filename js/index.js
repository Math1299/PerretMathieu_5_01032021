//Requête http fetch
function fetchData() {
  fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
    .then((data) => renderAllCameras(data));
}

function renderAllCameras(data) {
  for (const camera of data) {
    if ("content" in document.createElement("template")) {
      const main = document.querySelector("#product-list"); //On pointe #product-list
      let template = document.querySelector("#product"); // On pointe #product
      let clone = document.importNode(template.content, true); // On assigne les selections
      let img = clone.querySelector("img");
      let name = clone.querySelector("p");
      let button = clone.querySelector("a");
      img.src = camera.imageUrl; // On indique les routes
      button.href = "pages/product.html?id=" + camera._id;
      name.innerHTML = camera.name;
      main.appendChild(clone); // On ajoute toutes les datas à "main"
    }
  }
}

//Appel de la fonction
fetchData();
