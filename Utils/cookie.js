export const setCookie = (cookieName, value, option, option2) => {
  document.cookie = `${cookieName}=${value};${option};${option2}`;
};

export const getTokenCookie = () => {
  const cookie = document.cookie;
  if (cookie) {
    const cookieArr = cookie.split("=");
    return { token: cookieArr[1] };
  } else return "";
};
