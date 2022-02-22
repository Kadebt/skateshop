const initialState = {};

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
const USER_POINTS = "USER_POINTS";

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function userPoints(user) {
  return {
    type: USER_POINTS,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: initialState,
  };
}

export function getUser(user) {
  return {
    type: GET_USER,
    payload: user,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_POINTS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_USER:
      return { ...state, user: action.payload };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
