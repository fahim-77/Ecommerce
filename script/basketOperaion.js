import { parseProductItems } from "./script.js";
import { cart } from "./loadlocalstorage.js";

//////////////////// remove item from cart ////////////////////
export const removeHandler = (id, event) => {
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  event.target.parentElement.style.display = "none";
  event.target.parentElement.previousElementSibling.style.display = "block";
  cart.totalPrice -= cart.items[index].price;
  cart.items.pop(cart.items[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  event.target.parentElement.children[2].innerText = 1;
};

//////////////////// reduce item /////////////////////
export const reduceHandler = (id, event) => {
  const selectedItem = parseProductItems.find((item) => item.id === id);
  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  cart.items[index].count -= 1;
  if (cart.items[index].count === 0) {
    event.target.style.display = "none";
    event.target.parentElement.children[0].style.display = "block";
  } else {
    cart.totalPrice -= cart.items[index].price;
    localStorage.setItem("cart", JSON.stringify(cart));
    event.target.parentElement.children[2].innerText = cart.items[index].count;
  }
};

//////////////////// increase ////////////////////
export const addHandler = (id, event) => {
  event.target.parentElement.children[0].style.display = "none";
  event.target.parentElement.children[1].style.display = "block";
  const selectedItem = parseProductItems.find((item) => item.id === id);

  const index = cart.items.findIndex((item) => item.id === selectedItem.id);
  cart.items[index].count += 1;
  cart.totalPrice += cart.items[index].price;

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
  console.log(cart.items);
  cart.items.push(cartItem);
  cart.totalPrice = cart.items.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0
  );
  localStorage.setItem("cart", JSON.stringify(cart));
};

////////// Check availability or not in the shopping cart //////////
export const clickHandler = (id, event) => {
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
