import { Admin, LOGIN_REQUEST, LOGIN_SUCCESS, ActionTypes } from "./Actiontype";

export interface AdminState {
  loading: boolean;
  admin: Admin
}

export const defaultState: AdminState = {
  loading: false,
  admin: {username: "", password: ""}
}

const adminReducer = (state = defaultState, action: ActionTypes): AdminState => {
  switch(action.type) {
    case LOGIN_REQUEST: {
      return {
        loading: true,
        admin: {username:"", password: ""}
      }
    }
    case LOGIN_SUCCESS: {
      return {
        loading: false,
        admin: action.admin
      }
    }
    default:
        return state
  }
}
export default adminReducer
