import { fetchURL } from "../Utils/httpRequest.js";

const div = document.querySelector(".show-list");
const listItem = document.querySelectorAll("li");

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

console.log(users);
const showHandler = (event) => {
  div.classList.add("design");
  const list = document.createElement("ol");
  users.map((user) => {
    console.log(user.username);
    const li = document.createElement("li");
    li.innerText = `${user.username}`;
    list.appendChild(li);
  });
  div.appendChild(list);
  event.target.disabled = "true";
};
console.log(users);

window.addEventListener("load", () => {
  fetch();
  load();
  listItem.forEach((item) => item.addEventListener("click", showHandler));
});
