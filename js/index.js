function fetchData() {
  fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
    .then((data) => renderAllCameras(data));
}

function renderAllCameras(data) {
  for (const camera of data) {
    if ("content" in document.createElement("template")) {
      //On pointe #product-list
      const main = document.querySelector("#product-list");
      // On prépare une ligne pour le tableau
      let template = document.querySelector("#product");
      // On assigne les selections
      let clone = document.importNode(template.content, true);
      let img = clone.querySelector("img");
      let name = clone.querySelector("p");
      let button = clone.querySelector("a");
      // On indique les routes
      img.src = camera.imageUrl;
      button.href = "pages/product.html?id=" + camera._id;
      name.innerHTML = camera.name;
      // On ajoute toutes les datas à "main"
      main.appendChild(clone);
    }
  }
}

//Appel de la fonction
fetchData();
