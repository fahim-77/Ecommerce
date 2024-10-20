import { searchWordHandler } from "./searchWord.js";
import { searchPriceEnter, searchPriceHandler } from "./searchPrice.js";
import { filters, filterHandler } from "./filter.js";
import { fetchURL } from "../Utils/httpRequest.js";
import { show } from "./showItem.js";
import { setCookie, getTokenCookie } from "../Utils/cookie.js";
import {
  loadAllCart,
  cart,
  checkAllCart,
  loadCart,
  allCarts,
} from "./loadlocalstorage.js";

////////// search word //////////
const searchWord = document.querySelector("#search-word");

////////// search price //////////
const buttonSearch = document.querySelector(".search-button");
const searchPrice = document.querySelector("#search-price");

////////////////// sign out //////////////////
const signOut = document.querySelector(".fa-sign-out");

/////////////////// fetch //////////////////
export const parseProductItems = [];

async function fetch() {
  const { error, data } = await fetchURL("products", "Get");
  if (!error) {
    data.map((item) => parseProductItems.push(item));
  }
}

let token = null;
/////////////////// sign out //////////////////
const signOutHandler = () => {
  loadCart();
  loadAllCart();
  const index = allCarts.findIndex((item) => item.username === cart.username);
  if (index === -1) {
    allCarts.push(cart);
  } else {
    allCarts[index].items = [...cart.items];
    allCarts[index].totalPrice = cart.totalPrice;
  }
  localStorage.setItem("allCarts", JSON.stringify(allCarts));
  localStorage.removeItem("cart");
  alert("You are logged out ...");
  setCookie("token", token, "path=/", "expires=Thu, 01 Jan 1970 00:00:00 UTC");
  window.location.assign("../pages/login.html");
};

//////////////////// event ////////////////////
window.addEventListener("load", async () => {
  await fetch();
  show();
  checkAllCart();
  loadCart();
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

//////////////////// Validation ////////////////////
const init = () => {
  token = getTokenCookie();
  if (!token) location.assign("../pages/login.html");
};

window.addEventListener("DOMContentLoaded", init);
