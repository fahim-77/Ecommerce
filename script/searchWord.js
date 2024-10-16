import { itemsDown } from "./showItem.js";

////////// search word //////////
export const searchWordHandler = (event) => {
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
