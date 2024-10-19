import { getTokenCookie } from "../Utils/cookie.js";

export const valid = () => {
  const token = getTokenCookie();
  if (!token) location.assign("./login.html");
};
