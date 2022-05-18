import { type } from 'os';
import { Dispatch } from 'redux';
import { AppActions, ADD_USER } from './Actiontype';
import {  FETCH_USER_REQUEST,
          FETCH_USER_SUCCESS,
          Admin
        } from './Actiontype';
import { User } from './Actiontype';

const url = "http://localhost:3001/users"
const urladmin = "http://localhost:3001/admin"

const requestUser = (): AppActions => ({
  type: FETCH_USER_REQUEST,
  loading: true,
  Users: [],
  error: '',
});
const receiveUser = (users: User[]): AppActions => ({
  type: FETCH_USER_SUCCESS,
  loading: false,
  Users: users,
  error: '',
});

export const loadUsers = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(requestUser());
    return fetch(url)
      .then((res) => res.json())
      .then((json) => dispatch(receiveUser(json)));
  };
};


export const addUserAction = (user: User) => {
  return (dispatch: Dispatch<AppActions>) => {
    var option = {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(user)
    }
    fetch(url, option)
    .then((res) => res.json())
  }
}

export const deleteUserAction = (id: number) => {
  return (dispatch: Dispatch<AppActions>) => {
  var options = {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }
  fetch(url+'/'+id, options)
    .then((res) => res.json())
  }
}

export const getUserId = (id: number) => {
  return (dispatch: Dispatch<AppActions>) => {
      dispatch(requestUser())
      fetch(url+'/'+id)
      .then((res) => res.json())
      .then((json) => {
        console.log("jsonnn", json)
        dispatch(receiveUser(json))
      });
  }

}

export const editUserAction = (id: number, user: User) => {
  return (dispatch: Dispatch<AppActions>) => {
    var options = {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    fetch(url+'/'+id, options)
    .then((res) => res.json())

  }
}
