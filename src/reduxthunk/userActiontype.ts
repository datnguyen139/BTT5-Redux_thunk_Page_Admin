export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const ADD_USER = "ADD_USER"
export const DELETE_USER_ACTION = "DELETE_USER_ACTION";
export const EDIT_USER_ACTION = "EDIT_USER_ACTION"


export interface User {
  id: number
  name: string
  address: string
  email: string
  contact: string
}

export interface UserAsync {
  loading: boolean;
  Users: User[];
  error: string;
}

interface FetchUsersRequest extends UserAsync {
  type: typeof FETCH_USER_REQUEST;
}
interface FetchUsersSuccess extends UserAsync {
  type: typeof FETCH_USER_SUCCESS;
}
interface FetchUsersFailure extends UserAsync {
  type: typeof FETCH_USER_FAILURE;
}
interface deleteUserAction extends UserAsync {
  type: typeof DELETE_USER_ACTION
}
interface editUserAction extends UserAsync {
  type: typeof EDIT_USER_ACTION
}
interface addUserAction extends UserAsync {
  type: typeof ADD_USER
}

export type UserActionTypes =
  | FetchUsersRequest
  | FetchUsersSuccess
  | FetchUsersFailure
  | deleteUserAction
  | editUserAction
  | addUserAction

export type AppActions = UserActionTypes;
