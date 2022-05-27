import {
  User,
  ActionTypes,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  DELETE_USER_ACTION,
  EDIT_USER_ACTION,
  ADD_USER,
} from '../Actiontype';

export interface UserState {
  loading: boolean
  Users: User[]
  currentUser: User[] | User
  error: string
}

export const defaultState: UserState = {
  loading: false,
  Users: [],
  error: '',
  currentUser: []
};

const userReducer = ( state = defaultState, action: ActionTypes): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        loading: true,
        Users: [],
        error: '',
        currentUser: []
      };

    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        Users: action.Users,
        error: '',
        currentUser: action.currentUser
      };

    case FETCH_USER_FAILURE:
      return {
        loading: false,
        Users: [],
        error: action.error,
        currentUser: []
      };

    case ADD_USER:
      return {
        loading: false,
        Users: action.Users,
        error: '',
        currentUser: action.currentUser
      }

    case DELETE_USER_ACTION:
      return {
        loading: false,
        Users: action.Users,
        error: '',
        currentUser: action.currentUser
      }

    case EDIT_USER_ACTION:
      return {
        loading: false,
        Users: action.Users,
        error: '',
        currentUser: action.currentUser
      }

    default:
      return state;
  }
};

export default userReducer
