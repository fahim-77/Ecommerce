import {
  loadDiscount,
  discountCode,
  loadCart,
  cart,
  checkAllCart,
} from "./loadlocalstorage.js";
import { valid } from "./Validation.js";

const totalPrice = document.querySelector(".total-shopping");
const profit = document.querySelector(".profit");
profit.parentElement.style.display = "none";
const finalPrice = document.querySelector(".final-price");
finalPrice.parentElement.style.display = "none";
const btnApply = document.querySelector(".apply");
const input = document.querySelector(".code");

const show = () => {
  if (cart.totalPrice === 0) {
    checkAllCart();
  }
  totalPrice.innerText = Number(cart.totalPrice).toFixed(2);
};

//////////////////// Return to the initial state ////////////////////
function initialState() {
  totalPrice.classList.forEach((item) => {
    if (item === "delete") {
      totalPrice.classList.remove("delete");
    }
  });
  profit.parentElement.style.display = "none";
  finalPrice.parentElement.style.display = "none";
}

//////////////////// Apply discount code ///////////////////
const applyHandler = () => {
  const inputCode = input.value;
  const index = discountCode.findIndex((item) => item.code === inputCode);
  if (index === -1) {
    initialState();
    alert("The discount code entered is incorrect ...");
    input.value = null;
  } else {
    totalPrice.classList.add("delete");
    profit.parentElement.style.display = "block";
    finalPrice.parentElement.style.display = "block";
    const off = Number(
      (cart.totalPrice * (discountCode[index].percent / 100)).toFixed(2)
    );
    profit.innerText = off;
    finalPrice.innerText = Number(cart.totalPrice - off).toFixed(2);
  }
};

//////////////////// Apply changes as soon as the code is removed ///////////////////
const removeCode = () => {
  initialState();
};

window.addEventListener("load", () => {
  loadCart();
  show();
  loadDiscount();
  btnApply.addEventListener("click", applyHandler);
  input.addEventListener("keyup", removeCode);
});

window.addEventListener("DOMContentLoaded", valid);
