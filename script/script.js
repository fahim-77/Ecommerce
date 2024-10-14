import { show } from "./showItem.js";
///////// sign out /////////
const signOut = document.querySelector(".fa-sign-out");

////////////////////////////////////////////////////////
export const cart = { items: [], totalPrice: 0 };

////////// fetch /////////
export const parseProductItems = [];

async function fetch() {
  try {
    const request = await axios.get("https://fakestoreapi.com/products");
    if (request.status === 200) {
      request.data.map((item) => parseProductItems.push(item));
    }
  } catch (error) {
    console.log(error.message);
  }
}

////////// get from storage //////////
function loadLocalStorage() {
  const unParsedUsers = localStorage.getItem("username");
  if (unParsedUsers) {
    const userName = JSON.parse(unParsedUsers);
    alert(`Welcome ${userName} !!!`);
    localStorage.removeItem("username");
  }
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsed = JSON.parse(unParsedCart);
    cart.items = [...parsed.items];
    cart.totalPrice = parsed.totalPrice;
  }
}

////////// sign out /////////
const signOutHandler = () => {
  alert("You are logged out ...");
  window.location.replace("./login.html");
};

////////// event //////////
window.addEventListener("load", async () => {
  await fetch();
  show();
  loadLocalStorage();

  signOut.addEventListener("click", signOutHandler);
});
