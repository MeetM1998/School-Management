import { Map } from "immutable";

export function clearToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
}
/**
 * Gets the token.
 *
 * @return     {Map}  The token.
 */
export function getToken() {
  try {
    const authToken = localStorage.getItem("auth_token");
    const user = localStorage.user ? JSON.parse(localStorage.user) : null;
    return new Map({ authToken, user });
  } catch (err) {
    clearToken();
    return new Map();
  }
}
