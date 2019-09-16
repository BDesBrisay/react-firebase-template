export const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export function signIn({ token, user }) {
  setUser(user);
  setToken(token);
}

export async function signOut(firebase, history) {
  try {
    await firebase.auth().signOut();
    removeUser();
    removeToken();
    history.push('/');
  }
  catch (error) {
    console.error(error);
  }
}

export function isSignedIn() {
  const user = getUser();
  return user ? user: false;
}

export function getUser() {
  let userObj = localStorage.getItem(USER_KEY);
  return userObj ? JSON.parse(userObj) : undefined;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
