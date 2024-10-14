const tBody = document.querySelector("tbody");
const totalPrice = document.querySelector(".total-price");
const cart = { items: [], totalPrice: 0 };

const loadLocalStorage = () => {
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    cart.items = [...parsed.items];
    cart.totalPrice = parsed.totalPrice;
  }
};

const removeHandler = (event, id) => {
  const selectedItem = cart.items.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  event.target.parentElement.parentElement.style.display = "none";
  cart.totalPrice -= cart.items[index].count * cart.items[index].price;
  cart.items.pop(cart.items[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  event.target.parentElement.children[2].innerText = 1;
  totalPrice.innerText = Number(cart.totalPrice.toFixed(2));
};

const reduceHandler = (event, id) => {
  const selectedItem = cart.items.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  cart.items[index].count -= 1;
  if (cart.items[index].count === 0) {
    event.target.style.display = "none";
    event.target.parentElement.children[0].style.display = "block";
  } else {
    cart.totalPrice -= cart.items[index].price;
    localStorage.setItem("cart", JSON.stringify(cart));
    event.target.parentElement.children[2].innerText = cart.items[index].count;
    event.target.parentElement.nextSibling.innerText =
      cart.items[index].count * cart.items[index].price;
    totalPrice.innerText = Number(cart.totalPrice.toFixed(2));
  }
};

const addHandler = (event, id) => {
  const selectedItem = cart.items.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  cart.items[index].count += 1;
  cart.totalPrice += cart.items[index].price;
  localStorage.setItem("cart", JSON.stringify(cart));
  event.target.parentElement.children[2].innerText = cart.items[index].count;
  event.target.parentElement.nextSibling.innerText =
    cart.items[index].count * cart.items[index].price;
  totalPrice.innerText = Number(cart.totalPrice.toFixed(2));
};

function show() {
  for (let i in cart.items) {
    const tRow = document.createElement("tr");
    tBody.appendChild(tRow);
    tRow.classList.add("tRow");

    ////////// row //////////
    const row = document.createElement("td");
    row.style.paddingRight = "1.5rem";
    tRow.appendChild(row);
    row.innerHTML = +i + 1;

    ////////// title //////////
    const tDataTitle = document.createElement("td");
    tRow.appendChild(tDataTitle);
    tDataTitle.innerHTML = cart.items[i].title;

    ////////// price //////////
    const tDataPrice = document.createElement("td");
    tDataPrice.style.paddingRight = "1.5rem";
    tRow.appendChild(tDataPrice);
    tDataPrice.innerHTML = cart.items[i].price;

    ////////// div count //////////
    const divCount = document.createElement("div");
    divCount.style.paddingRight = "1.5rem";
    divCount.classList.add("div-count");
    tRow.appendChild(divCount);

    ////////// trash /////////
    const trash = document.createElement("i");
    trash.classList.add("fa");
    trash.classList.add("fa-trash");
    trash.style.color = "red";
    trash.addEventListener("click", (event) =>
      removeHandler(event, cart.items[i].id)
    );
    divCount.appendChild(trash);

    ////////// minus //////////
    const minus = document.createElement("i");
    minus.classList.add("fa");
    minus.classList.add("fa-minus");
    minus.addEventListener("click", (event) =>
      reduceHandler(event, cart.items[i].id)
    );
    divCount.appendChild(minus);

    if (cart.items[i].count > 1) {
      trash.style.display = "none";
    } else {
      minus.style.display = "none";
    }

    ////////// count //////////
    const tDataCount = document.createElement("td");
    tDataCount.classList.add("count");
    divCount.appendChild(tDataCount);
    tDataCount.innerHTML = cart.items[i].count;

    ////////// plus //////////
    const plus = document.createElement("i");
    plus.classList.add("fa");
    plus.classList.add("fa-plus");
    plus.addEventListener("click", (event) =>
      addHandler(event, cart.items[i].id)
    );
    divCount.appendChild(plus);

    ////////// total price //////////
    const tDataTotalPrice = document.createElement("td");
    tRow.appendChild(tDataTotalPrice);
    tDataTotalPrice.innerHTML = cart.items[i].price * cart.items[i].count;
  }
  totalPrice.innerText = cart.totalPrice;
}

window.addEventListener("load", () => {
  loadLocalStorage();
  show();
});
