

export function login(jwt) {
  return {
    type: "LOGIN",
    token: jwt,
  };
}

export function logout() {
  return {
    type: "LOGOUT",
  };
}

