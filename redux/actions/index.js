import firebase from "firebase"
require("firebase/firestore")
import { USER_STATE_CHANGE, USER_POSTS_CHANGE, CLEAR_DATA } from "../constants/index"

export function clearData() {
  return ((dispatch) => {
    dispatch({type: CLEAR_DATA})
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
          console.log("Does not exist")
        }
      })
  })
}

export function fetchUserPosts() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("post")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc") // orderby timestamp
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
        })
        // console.log(posts)
        dispatch({ type: USER_POSTS_CHANGE, posts: posts })
      })
  })
}

