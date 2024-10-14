import {
  clickHandler,
  addHandler,
  reduceHandler,
  removeHandler,
} from "./basketOperaion.js";

import { parseProductItems } from "./script.js";

const container = document.querySelector(".container");

export const itemsDown = [];
export const priceCount = [];
export const products = [];
const divInsert = [];
const spanCount = [];

////////// show item //////////
export const show = () => {
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
