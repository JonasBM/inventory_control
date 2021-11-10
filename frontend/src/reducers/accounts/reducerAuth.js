import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_USERPROFILE,
  USER_LOADED,
  USER_LOADING,
} from "../../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export default function reducerAuth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case UPDATE_USERPROFILE:
      let _user = undefined;
      if (action.payload.user) {
        _user = action.payload.user;
      } else {
        _user = action.payload;
      }
      return {
        ...state,
        user:
          state.user && _user
            ? state.user.id === _user.id
              ? _user
              : state.user
            : state.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.removeItem("token");
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...initialState,
        token: null,
      };
    default:
      return state;
  }
}
