//Récupération du localStorage
let order = Object.keys(localStorage);
for (let k = 0; k < order.length; k++) {
  let confOrder = JSON.parse(localStorage.getItem(order[k]));

  let confirmation = document.querySelector("#confirmation");

  //Ajout nbOrder
  let nbOrder = document.createElement("h2");
  nbOrder.classList.add("m-3");
  nbOrder.innerHTML = `Votre numéro de commande est le : ${confOrder.idOrder}`;
  confirmation.appendChild(nbOrder);

  //Ajout priceOrder
  let priceOrder = document.createElement("h2");
  priceOrder.classList.add("m-3");
  priceOrder.innerHTML = `Prix total : ${confOrder.price} CHF`;
  confirmation.appendChild(priceOrder);
}
localStorage.clear();
