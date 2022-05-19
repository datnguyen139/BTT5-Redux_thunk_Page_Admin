import { Admin, LOGIN_REQUEST, LOGIN_SUCCESS, ActionTypes, SIGNUP } from './Actiontype';

export interface AdminState {
  loading: boolean;
  admin: Admin[]
}

export const defaultState: AdminState = {
  loading: false,
  admin: []
}

const adminReducer = (state = defaultState, action: ActionTypes): AdminState => {
  switch(action.type) {
    case LOGIN_REQUEST: {
      return {
        loading: true,
        admin: []
      }
    }
    case LOGIN_SUCCESS: {
      return {
        loading: false,
        admin: action.admin
      }
    }
    case SIGNUP: {
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
