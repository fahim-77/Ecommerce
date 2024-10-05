const btnSignIn = document.querySelector(".btn-sign-in");
const btnSignUp = document.querySelector(".btn-sign-up");
const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");

const btnLogin = document.querySelector(".login");
const btnCreate = document.querySelector(".create");

const signInEmail = document.querySelector(".sign-in-email");
const signInPassword = document.querySelector(".sign-in-password");

const createAccountName = document.querySelector(".create-account-name");
const createAccountEmail = document.querySelector(".create-account-email");
const createAccountPassword = document.querySelector(
  ".create-account-password"
);
const homePage = document.querySelector(".home");
let users = [];

///////////////////////// storage //////////////////////
function loadLocalStorage() {
  const unParsedUsers = localStorage.getItem("users");
  if (unParsedUsers) {
    const parsedUsers = JSON.parse(unParsedUsers);
    users = [...parsedUsers];
  }
}
///////////////////// replace container ////////////////////
const createAccount = () => {
  container.style.display = "none";
  container2.style.display = "flex";
};

const singIn = () => {
  container2.style.display = "none";
  container.style.display = "flex";
};

/////////////////// event /////////////////////
const checkHandler = () => {
  let count = 0;
  const signInputEmail = signInEmail.value.trim();
  const signInputPassword = signInPassword.value.trim();
  users.forEach((user) => {
    if (
      user.email === signInputEmail &&
      atob(user.password) === signInputPassword
    ) {
      count++;
      const homepageHandler = () => {
        homePage.removeAttribute("href");
        homePage.removeAttribute("title");
        window.location.replace("../index.html");
        localStorage.setItem("username", JSON.stringify(user.name));
      };
      homePage.addEventListener("click", homepageHandler);
      alert("Login was successful ...");
    }
  });
  if (count === 0) alert("The email or password is incorrect ...");
};
const createHandler = () => {
  const regexEmail = /^[\w_\.]+@[a-zA-Z]+\.([a-zA-Z]{2,3})$/;
  // const regexPass = /^.{8}$/;

  const createInputName = createAccountName.value.trim();
  const createInputEmail = createAccountEmail.value.trim();
  const createInputPassword = createAccountPassword.value.trim();

  let count = 0;
  users.forEach((user) => {
    if (user.name === createInputName || user.email === createInputEmail) {
      count++;
      alert("A user with this name or email already exists ...");
    }
  });
  if (count === 0) {
    if (createInputName !== "") {
      if (regexEmail.test(createInputEmail)) {
        if (createInputPassword !== "") {
          const user = {
            name: createInputName,
            email: createInputEmail,
            password: btoa(createInputPassword),
          };
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
          container2.style.display = "none";
          container.style.display = "flex";
          alert(
            "Your account has been successfully created. Please login to go to the main page ..."
          );
        } else {
          alert("Password cannot be empty ...");
        }
      } else {
        alert("Please enter the correct email ...");
      }
    } else {
      alert("The Name cannot be empty ...");
    }
  }
};

window.addEventListener("load", () => {
  loadLocalStorage();
  btnSignUp.addEventListener("click", createAccount);
  btnSignIn.addEventListener("click", singIn);
  btnLogin.addEventListener("click", checkHandler);
  btnCreate.addEventListener("click", createHandler);
});
