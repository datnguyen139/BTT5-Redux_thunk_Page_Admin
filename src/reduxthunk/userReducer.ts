import { User } from './userActiontype';
import {
  UserActionTypes,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  DELETE_USER_ACTION,
  ADD_USER
} from './userActiontype';

export interface UserState {
  loading: boolean;
  Users: User[];
  error: string;
}

export const defaultState: UserState = {
  loading: false,
  Users: [],
  error: '',
};

const userReducer = ( state = defaultState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        loading: true,
        Users: [],
        error: ''
      };

    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        Users: action.Users,
        error: ''
      };

    case FETCH_USER_FAILURE:
      return {
        loading: false,
        Users: [],
        error: action.error
      };

    case ADD_USER:
      return {
        loading: false,
        Users: action.Users,
        error: ''
      }

    case DELETE_USER_ACTION:
      return {
        loading: false,
        Users: action.Users,
        error: ''
      }
    default:
      return state;
  }
};
export default userReducer
