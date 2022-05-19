import { Admin } from "./Actiontype";
import { Dispatch } from 'redux';
import { AppActions, LOGIN_REQUEST, LOGIN_SUCCESS } from "./Actiontype";

const url = "http://localhost:3001/admin"

const receiveAccountAdmin = (admin: Admin[]): AppActions => ({
  type: LOGIN_SUCCESS,
  loading: false,
  admin: admin
})

export const loadAdmin = () => {
  return (dispatch: Dispatch<AppActions>) => {
    return fetch(url)
      .then((res) => res.json())
      .then((json) => dispatch(receiveAccountAdmin(json)));
  }
}

export const addAccountAdmin = (admin: Admin) => {
  return (dispatch: Dispatch<AppActions>) => {
    var option = {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(admin)
    }
    fetch(url, option).then((res) => res.json())
  }
}
