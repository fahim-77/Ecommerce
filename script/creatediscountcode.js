const discounts = [];
function discountCode(code, percent) {
  const discount = {
    code,
    percent,
  };
  discounts.push(discount);
  localStorage.setItem("discount", JSON.stringify(discounts));
  console.log(discounts);
}

discountCode("paeeze_1403", 10);
discountCode("fahimeh", 20);
