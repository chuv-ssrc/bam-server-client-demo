

export function login(jwt) {
  return {
    type: "LOGIN",
    token: jwt,
  };
}

export function logout(jwt) {
  return {
    type: "LOGOUT",
  };
}

