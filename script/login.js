import { fetchURL } from "../Utils/httpRequest.js";
import { setCookie } from "../Utils/cookie.js";
const btnSignIn = document.querySelector(".btn-sign-in");
const btnSignUp = document.querySelector(".btn-sign-up");
const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");

const btnLogin = document.querySelector(".login");
const btnCreate = document.querySelector(".create");

const signInInput = document.querySelectorAll(".sign-in-input");
console.log(signInInput);

const createAccountInput = document.querySelectorAll(".create-account-input");

const users = [];

///////////////////////
async function fetch() {
  const { error, data } = await fetchURL("users", "Get");
  if (!error) {
    data.map((item) => {
      item.password = btoa(item.password);
      users.push(item);
    });
  }
}
///////////////////////// storage //////////////////////
function loadLocalStorage() {
  const unParsedUsers = localStorage.getItem("users");
  if (unParsedUsers) {
    const parsedUsers = JSON.parse(unParsedUsers);
    parsedUsers.map((user) => {
      users.push(user);
    });
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
const checkHandler = async () => {
  let count = 0;
  const signInputUserName = signInInput[0].value.trim();
  const signInputPassword = signInInput[1].value.trim();

  const index = users.findIndex(
    (user) =>
      user.username === signInputUserName &&
      atob(user.password) === signInputPassword
  );
  if (index !== -1) {
    const { error, data } = await fetchURL("auth/login", "POST", {
      username: signInputUserName,
      password: signInputPassword,
    });
    if (!error) {
      setCookie("token", data.token, "path=/", "max-age=86400");
      location.assign("../index.html");
      alert("Login was successful ...");
      localStorage.setItem("username", JSON.stringify(signInputUserName));
    } else {
      alert("Sorry, you do not have permission to enter the store ...");
    }
  } else {
    alert("The email or password is incorrect ...");
  }
};
const createHandler = () => {
  const regexEmail = /^[a-zA-Z]+[\w_\.]+@[a-zA-Z]+\.([a-zA-Z]{2,3})$/;
  const regexPass = /^.{8,}/;

  const createInputName = createAccountInput[0].value.trim();
  const createInputEmail = createAccountInput[1].value.trim();
  const createInputPassword = createAccountInput[2].value.trim();

  let count = 0;
  users.forEach((user) => {
    if (user.username === createInputName || user.email === createInputEmail) {
      count++;
      alert("A user with this name or email already exists ...");
    }
  });
  if (count === 0) {
    if (createInputName !== "") {
      if (regexEmail.test(createInputEmail)) {
        if (regexPass.test(createInputPassword)) {
          let role = null;
          if (createAccountInput[3].checked) {
            role = createAccountInput[3].value;
          } else if (createAccountInput[4].checked) {
            role = createAccountInput[4].value;
          }

          if (role) {
            const user = {
              username: createInputName,
              email: createInputEmail,
              password: btoa(createInputPassword),
              role,
            };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            container2.style.display = "none";
            container.style.display = "flex";
            alert(
              "Your account has been successfully created. Please login to go to the main page ..."
            );
            createAccountInput[0].value = null;
            createAccountInput[1].value = null;
            createAccountInput[2].value = null;
          } else {
            alert("Please complete all fields ...");
          }
        } else {
          alert("Password must have at least 8 characters ...");
        }
      } else {
        alert("Please enter the correct email ...");
      }
    } else {
      alert("The Username cannot be empty ...");
    }
  }
};

window.addEventListener("load", async () => {
  await fetch();
  loadLocalStorage();
  btnSignUp.addEventListener("click", createAccount);
  btnSignIn.addEventListener("click", singIn);
  btnLogin.addEventListener("click", checkHandler);
  btnCreate.addEventListener("click", createHandler);
});
