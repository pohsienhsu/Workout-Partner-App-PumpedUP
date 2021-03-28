import firebase from "firebase"
require("firebase/firestore")
import { USER_STATE_CHANGE, USER_PREF_CHANGE, CLEAR_DATA, USER_PROFILE_CHANGE, USER_PARTNER_CHANGE } from "../constants/index"

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
        console.log("Snapshot: ", snapshot);
        console.log("Does snapshot exists: ", snapshot.exists);
        // console.log("Snapshot val(): ", snapshot.user.val());
        if (snapshot) {
          //type & payload
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log("FetchUser: does not exist");
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

export function fetchUserProfile() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("userProfile")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          //type & payload
          dispatch({ type: USER_PROFILE_CHANGE, profile: snapshot.data() })
        } else {
          console.log("FetchUserProfile: does not exist")
        }
      })
  })
}

export function fetchUserPartner() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("partners")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        // console.log("#############  fetchUserPartner  ###############")
        // console.log(snapshot.data())
        if (snapshot.exists) {
          //type & payload
          dispatch({ type: USER_PARTNER_CHANGE, partners: snapshot.data().partner })
        } else {
          console.log("FetchUserPartner: does not exist")
        }
      })
  })
}

