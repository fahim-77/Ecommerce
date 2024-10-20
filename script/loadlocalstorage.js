export const cart = { username: null, items: [], totalPrice: 0 };
export const discountCode = [];
export const allCarts = [];
export const users = [];

//////////////////// check all cart and assign value to cart ////////////////////
export function checkAllCart() {
  const unParsed = localStorage.getItem("allCarts");
  const unParsedUserName = localStorage.getItem("username");
  if (unParsed && unParsedUserName) {
    const parsedArr = JSON.parse(unParsed);
    const parsedUserName = JSON.parse(unParsedUserName);
    parsedArr.forEach((element) => {
      if (element.username === parsedUserName) {
        cart.items = [...element.items];
        cart.totalPrice = element.totalPrice;
        cart.username = element.username;
      } else {
        cart.username = parsedUserName;
        cart.items = [];
        cart.totalPrice = 0;
      }
    });
  }
}

//////////////////// load cart from local storage ////////////////////
export function loadCart() {
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsedCart = JSON.parse(unParsedCart);
    cart.items = [...parsedCart.items];
    cart.totalPrice = parsedCart.totalPrice;
    cart.username = parsedCart.username;
  }
}

//////////////////// load all cart from local storage /////////////////////
export function loadAllCart() {
  const unParsed = localStorage.getItem("allCarts");
  if (unParsed) {
    const parsedArr = JSON.parse(unParsed);
    parsedArr.map((item) => {
      allCarts.push(item);
    });
  }
}

//////////////////// load discount code from local storage ////////////////////
export function loadDiscount() {
  const unParsedDiscount = localStorage.getItem("discount");
  if (unParsedDiscount) {
    const parsedDiscount = JSON.parse(unParsedDiscount);
    parsedDiscount.map((discount) => {
      discountCode.push(discount);
    });
  }
}

/////////////////// load users from local storage ///////////////////
export function loadUsers() {
  const unParsedUsers = localStorage.getItem("users");
  if (unParsedUsers) {
    const parsedUsers = JSON.parse(unParsedUsers);
    parsedUsers.map((user) => {
      users.push(user);
    });
  }
}
