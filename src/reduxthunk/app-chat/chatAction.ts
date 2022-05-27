import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/config";
import { Admin, Room } from "../Actiontype";
import { Dispatch } from 'redux';
import { AppActions} from "../Actiontype";

const date = new Date()

export const collectionUser = (user: Admin) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const addUser = await addDoc(collection(db, "user"),{
      id: user.id,
      name: user.username,
      status: user.status
    })
  }
}

export const createRoomChat = (room: Room) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const addRoom = await addDoc(collection(db, "room"),{
      userid_1: room.userid_1,
      userid_2: room.userid_2,
      createAt: date
    })
  }
}
