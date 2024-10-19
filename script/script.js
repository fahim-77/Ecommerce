import { searchWordHandler } from "./searchWord.js";

import { searchPriceEnter, searchPriceHandler } from "./searchPrice.js";

import { filters, filterHandler } from "./filter.js";

import { fetchURL } from "../Utils/httpRequest.js";
import { show } from "./showItem.js";
import { setCookie, getTokenCookie } from "../Utils/cookie.js";
import {
  cart,
  loadAll,
  loadAllCart,
  loadCart,
  allCarts,
} from "./loadlocalstorage.js";

///// search word /////
const searchWord = document.querySelector("#search-word");

///// search price /////
const buttonSearch = document.querySelector(".search-button");
const searchPrice = document.querySelector("#search-price");

///////// sign out /////////
const signOut = document.querySelector(".fa-sign-out");

////////////////////////////////////////////////////////

////////// fetch /////////
export const parseProductItems = [];

async function fetch() {
  const { error, data } = await fetchURL("products", "Get");
  if (!error) {
    data.map((item) => parseProductItems.push(item));
  }
}

// function check(array, cart) {
//   if (array) {
//     array.index
//     array.inde((item) => {
//       console.log(item);
//       if (item.username === cart.username) {
//         item.items = [...cart.items];
//         item.totalPrice = cart.totalPrice;
//       }
//     });
//   } else {
//     allCarts.push(cart);
//   }
// }
////////// get from storage //////////
// function loadLocalStorage() {
//   const unParsedUsers = localStorage.getItem("username");
//   if (unParsedUsers) {
//     const userName = JSON.parse(unParsedUsers);
//     cart.userName = unParsedUsers;
//     alert(`Welcome ${userName} !!!`);
//     localStorage.removeItem("username");
//   }
//   const unParsedCart = localStorage.getItem("cart");
//   if (unParsedCart) {
//     const parsed = JSON.parse(unParsedCart);
//     cart.items = [...parsed.items];
//     cart.totalPrice = parsed.totalPrice;
//   }
// }

let token = null;
////////// sign out /////////
const signOutHandler = () => {
  loadCart();
  loadAll();
  const index = allCarts.findIndex((item) => item.username === cart.username);
  if (index === -1) {
    allCarts.push(cart);
  } else {
    allCarts[index].items = [...cart.items];
    allCarts[index].totalPrice = cart.totalPrice;
  }
  console.log(index);
  // check(allCarts, cart);
  console.log(allCarts);
  localStorage.setItem("allCarts", JSON.stringify(allCarts));
  localStorage.removeItem("cart");
  alert("You are logged out ...");
  setCookie("token", token, "path=/", "expires=Thu, 01 Jan 1970 00:00:00 UTC");
  window.location.assign("../pages/login.html");
};

////////// event //////////
window.addEventListener("load", async () => {
  await fetch();
  show();
  loadAllCart();
  ///// search word /////
  searchWord.addEventListener("keyup", searchWordHandler);

  ///// search price /////
  searchPrice.addEventListener("keyup", searchPriceEnter);
  buttonSearch.addEventListener("click", searchPriceHandler);

  ///// filter /////
  filters.forEach((button) => button.addEventListener("click", filterHandler));

  ///// sign out /////
  signOut.addEventListener("click", signOutHandler);
});

const init = () => {
  token = getTokenCookie();
  if (!token) location.assign("../pages/login.html");
};

window.addEventListener("DOMContentLoaded", init);
