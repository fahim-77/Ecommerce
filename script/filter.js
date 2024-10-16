import { products } from "./showItem.js";

export const filters = document.querySelectorAll(".filters");

////////// filter //////////
export const filterHandler = (event) => {
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
