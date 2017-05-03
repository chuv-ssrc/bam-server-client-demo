


const initialState = {
  loggedIn: false,
};


function authReducers(state = initialState, action) {
  switch (action.type) {

    case 'LOGIN':
      return { ...state, loggedIn: true, token: action.token };

    case 'LOGOUT':
      return { ...state, loggedIn: false, token: undefined };

    // Show the Auth0 lock
    case 'SHOW_LOGIN_SCREEN':
      return { ...state, showLoginScreen: true };

    // Hide the Auth0 lock
    case 'HIDE_LOGIN_SCREEN':
      return { ...state, showLoginScreen: false };

    default:
      return state;
  }
}


export default authReducers;

