// window.location.assign("login/login.html");
/////////////////////////////////////////
const container = document.querySelector(".container");

async function get() {
  try {
    const request = await fetch("https://fakestoreapi.com/products");
    if (request.status === 200) {
      const data = await request.json();
      localStorage.setItem("productItems", JSON.stringify(data));
    }
  } catch (error) {
    console.log(error.message);
  }
}

////////// get from storage //////////
function loadLocalStorage() {
  const unParsedUsers = localStorage.getItem("username");
  if (unParsedUsers) {
    const userName = JSON.parse(unParsedUsers);
    alert(`Welcome ${userName} !!!`);
    localStorage.removeItem("username");
  }
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    cart.items = [...parsed.items];
    cart.totalPrice = parsed.totalPrice;
  }
}

// const removeHandler = (index, event) => {
//   event.target.parentElement.style.display = "none";
//   event.target.parentElement.previousElementSibling.style.display = "block";
//   cart.totalPrice = cart.items.reduce(
//     (acc, cur) => acc - cur.price * cur.count - acc,
//     0
//   );
//   cart.items.pop(cart.items[index]);
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

const removeHandler = (index, event) => {
  event.target.parentElement.style.display = "none";
  event.target.parentElement.previousElementSibling.style.display = "block";
  cart.items[index].count = 0;
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => acc - cur.price * cur.count,
    0
  );
  spanCount[index].innerText = 1;
  cart.items.pop(cart.items[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const reduceHandler = (index) => {
  cart.items[index].count -= 1;
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => acc - cur.price * cur.count,
    0
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  spanCount[index].innerText = cart.items[index].count;
  if (cart.items[index].count === 1) {
    btnMinus[index].style.display = "none";
    btnTrash[index].style.display = "block";
    spanCount[index].innerText = cart.items[index].count;
    btnTrash[index].addEventListener("click", (event) =>
      removeHandler(index, event)
    );
  }
};

const addHandler = (index) => {
  cart.items[index].count += 1;
  spanCount[index].innerText = cart.items[index].count;
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0
  );
  localStorage.setItem("cart", JSON.stringify(cart));
};

const insertToCart = (product) => {
  const cartItem = {
    id: product.id,
    title: product.title.slice(0, 20),
    price: product.price,
    count: 1,
  };
  cart.items.push(cartItem);
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0
  );
  localStorage.setItem("cart", JSON.stringify(cart));
};
const clickHandler = (id, event) => {
  event.target.style.display = "none";
  event.target.nextSibling.style.display = "flex";
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  if (index >= 0) {
    if (cart.items[index].count > 1) {
      btnTrash[index].style.display = "none";
      btnMinus[index].style.display = "block";
      spanCount[index].innerText = cart.items[index].count;
      btnPlus[index].addEventListener("click", () => addHandler(index));
      btnMinus[index].addEventListener("click", () => reduceHandler(index));
    }
    if (cart.items[index].count === 1) {
      btnMinus[index].style.display = "none";
      btnTrash[index].style.display = "block";
      spanCount[index].innerText = cart.items[index].count;
      btnPlus[index].addEventListener("click", () => addHandler(index));
      btnTrash[index].addEventListener("click", (event) =>
        removeHandler(index, event)
      );
    }
  } else {
    insertToCart(selectedItem);
  }
};

const productItems = localStorage.getItem("productItems");
const parseProductItems = JSON.parse(productItems);

const productContainer = document.createElement("div");
productContainer.classList.add("products");
parseProductItems.map((item) => {
  ///// div product item /////
  const divProductItem = document.createElement("div");
  divProductItem.classList.add("product-items");
  divProductItem.dataset.category = item.category;
  productContainer.appendChild(divProductItem);

  ///// image /////
  const image = document.createElement("img");
  image.src = item.image;
  divProductItem.appendChild(image);

  ///// div item down /////
  const divItemDown = document.createElement("div");
  divItemDown.classList.add("item-down");
  divProductItem.appendChild(divItemDown);

  ///// h3 /////
  const h3 = document.createElement("h3");
  h3.classList.add("caption");
  h3.innerHTML = item.title;
  divItemDown.appendChild(h3);

  ///// div price and count /////
  const divPriceCount = document.createElement("div");
  divPriceCount.classList.add("price-count");
  divItemDown.appendChild(divPriceCount);

  ///// span /////
  const spanPrice = document.createElement("span");
  spanPrice.innerHTML = item.price;
  divPriceCount.appendChild(spanPrice);

  ///// button /////
  const button = document.createElement("button");
  button.classList.add("add");
  button.innerHTML = "Add to cart";
  button.addEventListener("click", (event) => clickHandler(item.id, event));
  divPriceCount.appendChild(button);

  ///// div insert and count /////
  const divInsertCount = document.createElement("div");
  divInsertCount.classList.add("insert-count");
  divInsertCount.style.display = "none";
  divPriceCount.appendChild(divInsertCount);

  ///// input /////
  // const input = document.createElement("input");
  // input.classList.add("input-count");
  // input.type = "number";
  // divInsertCount.appendChild(input);
  ///// trash and minus and span and plus /////
  const trash = document.createElement("i");
  trash.classList.add("fa");
  trash.classList.add("fa-trash");
  trash.setAttribute("aria-hidden", "true");
  // trash.addEventListener("click", (event) => moveToTrash(item.id, event));
  divInsertCount.appendChild(trash);

  const minus = document.createElement("i");
  minus.classList.add("fa");
  minus.classList.add("fa-minus");
  minus.setAttribute("aria-hidden", "true");
  minus.style.display = "none";
  divInsertCount.appendChild(minus);

  const spanCount = document.createElement("span");
  spanCount.classList.add("span-count");
  spanCount.innerText = "1  ";
  divInsertCount.appendChild(spanCount);

  const plus = document.createElement("i");
  plus.classList.add("fa");
  plus.classList.add("fa-plus");
  plus.setAttribute("aria-hidden", "true");
  divInsertCount.appendChild(plus);
});
container.appendChild(productContainer);

////////// search word //////////
const searchWord = document.querySelector("#search-word");
const itemsDown = document.querySelectorAll(".item-down");

////////// search price //////////
const priceCount = document.querySelectorAll(".price-count");
const buttonSearch = document.querySelector(".search-button");
const searchPrice = document.querySelector("#search-price");

////////// filters //////////
const filters = document.querySelectorAll(".filters");
const products = document.querySelectorAll(".product-items");

////////// trash //////////
const divInsert = document.querySelectorAll(".insert-count");
const btnTrash = document.querySelectorAll(".fa-trash");
const btnPlus = document.querySelectorAll(".fa-plus");
const btnMinus = document.querySelectorAll(".fa-minus");
const spanCount = document.querySelectorAll(".span-count");

////////////////////////////////////////////////////////
const cart = { items: [], totalPrice: 0 };

/////////////
const list = document.querySelector(".list");
const linkShop = document.querySelector(".fa");
const buttonsAdd = document.querySelectorAll(".add");
//////////////

////////// search word //////////
const searchWordHandler = (event) => {
  const inputWord = event.target.value.toLowerCase().trim();
  itemsDown.forEach((item) => {
    const title = item.children[0].innerText.toLowerCase();
    if (title.includes(inputWord)) {
      item.parentElement.style.display = "block";
    } else {
      item.parentElement.style.display = "none";
    }
  });
};

////////// search price //////////
///// show item
function showProduct(inputPrice) {
  priceCount.forEach((price) => {
    const prices = price.children[0].innerText;
    if (prices === inputPrice) {
      price.parentElement.parentElement.style.display = "block";
    } else {
      price.parentElement.parentElement.style.display = "none";
    }
  });
}
///// event click
const searchPriceHandler = (event) => {
  const inputPrice = event.target.previousElementSibling.value.trim();
  showProduct(inputPrice);
};
///// event Enter
const searchPriceEnter = (event) => {
  priceCount.forEach((price) => {
    price.parentElement.parentElement.style.display = "block";
  });
  if (event.key === "Enter") {
    const inputPrice = event.target.value.trim();
    showProduct(inputPrice);
  }
};
////////// filter //////////
const filterHandler = (event) => {
  filters.forEach((item) => {
    item.classList.remove("active");
  });

  event.target.classList.add("active");
  products.forEach((product) => {
    const dataset = product.dataset.category;
    const eventDataset = event.target.dataset.filter;
    if (eventDataset === "all") {
      product.style.display = "block";
    } else if (dataset === eventDataset) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

////////// insert new item & remove item //////////
// const insertHandler = (event) => {

// if (event.target.innerText === "Add") {
//   if (event.target.previousElementSibling.value) {
//     event.target.style.width = "60px";
//     event.target.innerText = "remove";
//     const buttonsAdd2 = [...buttonsAdd];
//     const productItem = {
//       id: buttonsAdd2.indexOf(event.target),
//       title:
//         event.target.parentElement.parentElement.previousElementSibling
//           .innerText,
//       price: event.target.parentElement.previousElementSibling.innerText,
//       count: event.target.previousElementSibling.value,
//       total:
//         event.target.parentElement.previousElementSibling.innerText *
//         event.target.previousElementSibling.value,
//     };
//     for (let i in cart.item) {
//       if (cart.item[i].id === productItem.id) {
//         productItem.count =
//           +cart.item[i].count + +event.target.previousElementSibling.value;
//         cart.item.splice(i, i + 1);
//       }
//     }
//     if (productItem.total !== 0) {
//       cart.item.push(productItem);
//       cart.totalPrice = cart.item.reduce(
//         (acc, cur) => acc + cur.count * cur.price,
//         0
//       );
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     event.target.parentElement.value = null;
//   }
// } else if (event.target.innerText === "remove") {
//   const buttonsAdd2 = [...buttonsAdd];
//   for (let i in cart.item) {
//     if (cart.item[i].id === buttonsAdd2.indexOf(event.target)) {
//       cart.item.splice(i, i + 1);
//     }
//   }
//   if (cart.total !== 0) {
//     cart.totalPrice = cart.item.reduce(
//       (acc, cur) => cur.count * cur.price - acc,
//       0
//     );
//   }
//   localStorage.setItem("cart", JSON.stringify(cart));
//   event.target.previousElementSibling.value = null;
//   event.target.innerText = "Add";
// }
// };

////////// event //////////
window.addEventListener("load", () => {
  get();
  loadLocalStorage();
  searchWord.addEventListener("keyup", searchWordHandler);

  searchPrice.addEventListener("keyup", searchPriceEnter);
  buttonSearch.addEventListener("click", searchPriceHandler);

  filters.forEach((button) => button.addEventListener("click", filterHandler));

  // buttonsAdd.forEach((button) => {
  //   button.addEventListener("click", insertHandler);
  // });
});
