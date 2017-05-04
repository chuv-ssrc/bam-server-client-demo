

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

export function feedback(status, message) {
  return {
    type: "FEEDBACK",
    status: status,
    message: message,
  };
}

