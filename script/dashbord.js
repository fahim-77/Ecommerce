import { valid } from "./Validation.js";
import { loadDiscount, discountCode } from "./loadlocalstorage.js";
const users = [];

const table = document.querySelector(".discount");
table.style.display = "none";
const div = document.querySelector(".show-list");
const listItem = document.querySelectorAll("li");

let click = 0;
let click2 = 0;

function loadLocalStorage() {
  const unParsedUsers = localStorage.getItem("users");
  if (unParsedUsers) {
    const parsedUsers = JSON.parse(unParsedUsers);
    parsedUsers.map((user) => {
      users.push(user);
    });
  }
}

const showHandler = (event) => {
  click++;
  if (click === 1) {
    div.style.display = "block";
    div.classList.add("design");
    const list = document.createElement("ul");
    list.classList.add("list2");
    users.map((user) => {
      const li = document.createElement("li");
      li.innerText = `${user.username}`;
      list.appendChild(li);
    });
    div.appendChild(list);
  } else if (click === 2) {
    div.style.display = "none";
    const list = document.querySelector(".list2");
    console.log(list);
    list.remove();
    click = 0;
  }
};

const showCode = () => {
  click2++;
  if (click2 === 1) {
    table.style.display = "block";
    const tBody = document.createElement("tbody");
    tBody.classList.add("tbody-discount");
    discountCode.map((item) => {
      const tRow = document.createElement("tr");
      const tDataCode = document.createElement("td");
      tDataCode.innerText = item.code;
      const tDataPercent = document.createElement("td");
      tDataPercent.innerText = item.percent;

      tRow.appendChild(tDataCode);
      tRow.appendChild(tDataPercent);
      tBody.appendChild(tRow);
    });
    table.appendChild(tBody);
  } else if (click2 === 2) {
    const tBody = document.querySelector(".tbody-discount");
    tBody.remove();
    table.style.display = "none";
    click2 = 0;
  }
};

window.addEventListener("load", async () => {
  loadLocalStorage();
  loadDiscount();
  listItem[0].addEventListener("click", showHandler);
  listItem[1].addEventListener("click", showCode);
});

window.addEventListener("DOMContentLoaded", valid);
