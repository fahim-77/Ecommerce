import { fetchURL } from "../Utils/httpRequest.js";

const table = document.querySelector(".discount");
table.style.display = "none";
const div = document.querySelector(".show-list");
const listItem = document.querySelectorAll("li");
let click = 0;
let click2 = 0;

const users = [];
async function fetch() {
  const { error, data } = await fetchURL("users", "Get");
  if (!error) {
    data.map((item) => users.push(item));
  }
}

const load = () => {
  const unParsedUsers = localStorage.getItem("users");
  if (unParsedUsers) {
    const usersLocal = JSON.parse(unParsedUsers);
    usersLocal.map((user) => {
      users.push(user);
    });
  }
};

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
    users.splice(0);
  } else if (click === 2) {
    div.style.display = "none";
    click = 0;
  }
};

const showCode = () => {
  click2++;
  if (click2 === 1) {
    table.style.display = "block";
  } else if (click2 === 2) {
    table.style.display = "none";
    click2 = 0;
  }
};

window.addEventListener("load", async () => {
  await fetch();
  load();
  listItem[0].addEventListener("click", showHandler);
  listItem[1].addEventListener("click", showCode);
});
