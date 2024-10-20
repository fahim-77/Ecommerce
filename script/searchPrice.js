import { priceCount } from "./showItem.js";

///// show product item /////
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
export const searchPriceHandler = (event) => {
  const inputPrice = event.target.previousElementSibling.value.trim();
  showProduct(inputPrice);
};

///// event Enter
export const searchPriceEnter = (event) => {
  priceCount.forEach((price) => {
    price.parentElement.parentElement.style.display = "block";
  });
  if (event.key === "Enter") {
    const inputPrice = event.target.value.trim();
    showProduct(inputPrice);
  }
};
