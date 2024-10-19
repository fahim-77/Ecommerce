import { loadDiscount, discountCode } from "./loadlocalstorage.js";
import { valid } from "./Validation.js";
const totalPrice = document.querySelector(".total-shopping");
const profit = document.querySelector(".profit");
profit.parentElement.style.display = "none";
const finalPrice = document.querySelector(".final-price");
finalPrice.parentElement.style.display = "none";
const btnApply = document.querySelector(".apply");
const input = document.querySelector(".code");
const cart = { items: [], totalPrice: 0 };
const loadLocalStorage = () => {
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    cart.items = [...parsed.items];
    cart.totalPrice = parsed.totalPrice;
  }
};
const show = () => {
  totalPrice.innerText = Number(cart.totalPrice).toFixed(2);
};

const applyHandler = () => {
  const inputCode = input.value;
  const index = discountCode.findIndex((item) => item.code === inputCode);
  console.log(index);
  if (index === -1) {
    input.value = null;
    alert("The discount code entered is incorrect ...");
    profit.parentElement.style.display = "none";
    finalPrice.parentElement.style.display = "none";
  } else {
    profit.parentElement.style.display = "block";
    finalPrice.parentElement.style.display = "block";
    const off = Number(
      (cart.totalPrice * (discountCode[index].percent / 100)).toFixed(2)
    );
    profit.innerText = off;
    finalPrice.innerText = Number(cart.totalPrice - off).toFixed(2);
  }
};

window.addEventListener("load", () => {
  loadLocalStorage();
  show();
  loadDiscount();
  btnApply.addEventListener("click", applyHandler);
});

window.addEventListener("DOMContentLoaded", valid);
