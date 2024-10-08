////////// search word //////////
const searchWord = document.querySelector("#search-word");

////////// search price //////////
const buttonSearch = document.querySelector(".search-button");
const searchPrice = document.querySelector("#search-price");

////////// filters //////////
const filters = document.querySelectorAll(".filters");

///////// sign out /////////
const signOut = document.querySelector(".fa-sign-out");

////////////////////////////////////////////////////////
const cart = { items: [], totalPrice: 0 };

const itemsDown = [];
const priceCount = [];
const products = [];
const divInsert = [];
const btnTrash = [];
const btnPlus = [];
const btnMinus = [];
const spanCount = [];

////////// fetch /////////
const parseProductItems = [];
async function fetch() {
  try {
    const request = await axios.get("https://fakestoreapi.com/products");
    if (request.status === 200) {
      request.data.map((item) => parseProductItems.push(item));
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

////////// remove item from cart //////////
const removeHandler = (id, event) => {
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  event.target.parentElement.style.display = "none";
  event.target.parentElement.previousElementSibling.style.display = "block";
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => Math.abs(cur.price * cur.count - acc),
    0
  );
  cart.items.pop(cart.items[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  event.target.parentElement.children[2].innerText = 1;
};

////////// reduce item ///////////
const reduceHandler = (id, event) => {
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  cart.items[index].count -= 1;
  if (cart.items[index].count === 0) {
    event.target.style.display = "none";
    event.target.parentElement.children[0].style.display = "block";
  } else {
    cart.totalPrice = cart.items.reduce(
      (acc, cur) => Math.abs(cur.price * cur.count - acc),
      0
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    event.target.parentElement.children[2].innerText = cart.items[index].count;
  }
};

////////// increase //////////
const addHandler = (id, event) => {
  event.target.parentElement.children[0].style.display = "none";
  event.target.parentElement.children[1].style.display = "block";
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  cart.items[index].count += 1;
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  event.target.parentElement.children[2].innerText = cart.items[index].count;
};

////////// add new item to cart /////////
const insertToCart = (product) => {
  const cartItem = {
    id: product.id,
    title: `${product.title.slice(0, 20)} ...`,
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

////////// Check availability or not in the shopping cart //////////
const clickHandler = (id, event) => {
  event.target.style.display = "none";
  event.target.nextSibling.style.display = "flex";
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  if (index >= 0) {
    if (cart.items[index].count > 1) {
      event.target.nextSibling.children[0].style.display = "none";
      event.target.nextSibling.children[1].style.display = "block";
      event.target.nextSibling.children[2].innerText = cart.items[index].count;
    } else if (cart.items[index].count === 1) {
      event.target.nextSibling.children[1].style.display = "none";
      event.target.nextSibling.children[0].style.display = "block";
      event.target.nextSibling.children[2].innerText = cart.items[index].count;
    }
  } else {
    insertToCart(selectedItem);
  }
};

////////// show item //////////
const show = () => {
  const container = document.querySelector(".container");
  const productContainer = document.createElement("div");
  productContainer.classList.add("products");
  parseProductItems.map((item) => {
    ///// div product item /////
    const divProductItem = document.createElement("div");
    divProductItem.classList.add("product-items");
    divProductItem.dataset.category = item.category;
    products.push(divProductItem);
    productContainer.appendChild(divProductItem);

    ///// image /////
    const image = document.createElement("img");
    image.src = item.image;
    divProductItem.appendChild(image);

    ///// div item down /////
    const divItemDown = document.createElement("div");
    divItemDown.classList.add("item-down");
    itemsDown.push(divItemDown);
    divProductItem.appendChild(divItemDown);

    ///// h3 /////
    const h3 = document.createElement("h3");
    h3.classList.add("caption");
    h3.innerHTML = item.title;
    divItemDown.appendChild(h3);

    ///// div price and count /////
    const divPriceCount = document.createElement("div");
    divPriceCount.classList.add("price-count");
    priceCount.push(divPriceCount);
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
    divInsert.push(divInsertCount);
    divInsertCount.style.display = "none";
    divPriceCount.appendChild(divInsertCount);

    ///// trash /////
    const trash = document.createElement("i");
    trash.classList.add("fa");
    trash.classList.add("fa-trash");
    trash.setAttribute("aria-hidden", "true");
    trash.addEventListener("click", (event) => removeHandler(item.id, event));
    divInsertCount.appendChild(trash);

    ///// minus /////
    const minus = document.createElement("i");
    minus.classList.add("fa");
    minus.classList.add("fa-minus");
    minus.setAttribute("aria-hidden", "true");
    minus.style.display = "none";
    minus.addEventListener("click", (event) => reduceHandler(item.id, event));
    divInsertCount.appendChild(minus);

    ///// minus /////
    const spanCountShow = document.createElement("span");
    spanCountShow.classList.add("span-count");
    spanCountShow.innerText = "1  ";
    spanCount.push(spanCountShow);
    divInsertCount.appendChild(spanCountShow);

    ///// plus /////
    const plus = document.createElement("i");
    plus.classList.add("fa");
    plus.classList.add("fa-plus");
    plus.setAttribute("aria-hidden", "true");
    plus.addEventListener("click", (event) => addHandler(item.id, event));
    divInsertCount.appendChild(plus);
  });
  container.appendChild(productContainer);
};

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

////////// sign out /////////
const signOutHandler = () => {
  alert("You are logged out ...");
  window.location.replace("../login/login.html");
};

////////// event //////////
window.addEventListener("load", async () => {
  await fetch();
  show();
  loadLocalStorage();
  searchWord.addEventListener("keyup", searchWordHandler);

  searchPrice.addEventListener("keyup", searchPriceEnter);
  buttonSearch.addEventListener("click", searchPriceHandler);

  filters.forEach((button) => button.addEventListener("click", filterHandler));

  signOut.addEventListener("click", signOutHandler);
});
