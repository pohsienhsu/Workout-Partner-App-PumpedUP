import firebase from "firebase"
require("firebase/firestore")
import { USER_STATE_CHANGE, USER_PREF_CHANGE, CLEAR_DATA } from "../constants/index"

export function clearData() {
  return ((dispatch) => {
    dispatch({ type: CLEAR_DATA })
  })
}

export function fetchUser() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          //type & payload
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log("FetchUser: does not exist")
        }
      })
  })
}

export function fetchUserPref() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPref")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          //type & payload
          dispatch({ type: USER_PREF_CHANGE, pairingPref: snapshot.data() })
        } else {
          console.log("FetchUserPref: does not exist")
        }
      })
  })
}

