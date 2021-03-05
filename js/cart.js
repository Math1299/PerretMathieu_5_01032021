const cartItems = JSON.parse(localStorage.getItem("cameras"));
let x = 0;
let totalPrice = 0;

if (cartItems) {
  for (let i = 0; i < cartItems.length; i++) {
    fetchData(cartItems[i]["id"]);
  }
}
function fetchData(id) {
  fetch("http://localhost:3000/api/cameras/" + id)
    .then((response) => response.json())
    .then((data) => intoCart(data));
}

function intoCart(camera) {
  x = x + 1;
  let table = document.querySelector("table");
  let newLine = document.createElement("tbody");
  let tr = newLine.appendChild(document.createElement("tr"));
  let th = tr.appendChild(document.createElement("th"));
  let name = tr.appendChild(document.createElement("td"));
  let price = tr.appendChild(document.createElement("td"));
  let lens = tr.appendChild(document.createElement("td"));
  //   let supp = tr.appendChild(document.createElement("button"));
  th.innerHTML = x;
  name.innerHTML = camera.name;
  //   supp.className = "btn btn-danger ";
  price.innerHTML = `${camera.price / 100} CHF`;
  lens.innerHTML = cartItems[x - 1]["lens"];

  table.appendChild(newLine);
  totalPrice += camera.price;
  document.querySelector("h5").innerText = `TOTAL : ${totalPrice} CHF`;
  //   supp.onclick = function () {
  //     remove();
  //   };
}
