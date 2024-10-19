export const cart = { username: null, items: [], totalPrice: 0 };
export const discountCode = [];
export const allCarts = [];

export function loadAllCart() {
  const unParsed = localStorage.getItem("allCarts");
  const unParsedUserName = localStorage.getItem("username");
  if (unParsed && unParsedUserName) {
    const parsedArr = JSON.parse(unParsed);
    const parsedUserName = JSON.parse(unParsedUserName);
    console.log(parsedUserName);
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

export function loadCart() {
  const unParsedCart = localStorage.getItem("cart");
  if (unParsedCart) {
    const parsedCart = JSON.parse(unParsedCart);
    cart.items = [...parsedCart.items];
    cart.totalPrice = parsedCart.totalPrice;
    cart.username = parsedCart.username;
  }
}

export function loadAll() {
  const unParsed = localStorage.getItem("allCarts");
  if (unParsed) {
    const parsedArr = JSON.parse(unParsed);
    parsedArr.map((item) => {
      allCarts.push(item);
    });
  }
}

export function loadDiscount() {
  const unParsedDiscount = localStorage.getItem("discount");
  if (unParsedDiscount) {
    const parsedDiscount = JSON.parse(unParsedDiscount);
    parsedDiscount.map((discount) => {
      discountCode.push(discount);
    });
  }
}
