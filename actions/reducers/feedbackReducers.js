
const initialState = {};


function authReducers(state = initialState, action) {
  switch (action.type) {

    case "FEEDBACK":
      return {...state, status: action.status, message: action.message};

    default:
      return state;

  }
}


export default authReducers;
