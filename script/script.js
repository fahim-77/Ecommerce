import { searchWordHandler } from "./searchWord.js";

import { searchPriceEnter, searchPriceHandler } from "./searchPrice.js";

import { filters, filterHandler } from "./filter.js";

import { fetchURL } from "../Utils/httpRequest.js";
import { show } from "./showItem.js";
import { setCookie, getTokenCookie } from "../Utils/cookie.js";

///// search word /////
const searchWord = document.querySelector("#search-word");

///// search price /////
const buttonSearch = document.querySelector(".search-button");
const searchPrice = document.querySelector("#search-price");

///////// sign out /////////
const signOut = document.querySelector(".fa-sign-out");

////////////////////////////////////////////////////////
export const cart = { userName: null, items: [], totalPrice: 0 };

////////// fetch /////////
export const parseProductItems = [];

async function fetch() {
  const { error, data } = await fetchURL("products", "Get");
  if (!error) {
    data.map((item) => parseProductItems.push(item));
  }
}

////////// get from storage //////////
function loadLocalStorage() {
  const unParsedUsers = localStorage.getItem("username");
  if (unParsedUsers) {
    const userName = JSON.parse(unParsedUsers);
    cart.userName = unParsedUsers;
    alert(`Welcome ${userName} !!!`);
    // localStorage.removeItem("username");
  }
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    cart.items = [...parsed.items];
    cart.totalPrice = parsed.totalPrice;
  }
}

let token = null;
////////// sign out /////////
const signOutHandler = () => {
  alert("You are logged out ...");
  setCookie("token", token, "path=/", "expires=Thu, 01 Jan 1970 00:00:00 UTC");
  window.location.assign("../pages/login.html");
};

////////// event //////////
window.addEventListener("load", async () => {
  await fetch();
  show();
  loadLocalStorage();
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
