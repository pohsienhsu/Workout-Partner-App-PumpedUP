import { USER_STATE_CHANGE, USER_PREF_CHANGE, CLEAR_DATA, USER_PROFILE_CHANGE, USER_PARTNER_CHANGE } from "../constants"

const initialState = {
  currentUser: null,
  pairingPref: {
    gender: { Male: false, Female: false, Others: false },
    bodyPart: [],
    experience: "",
    location: { 'In-Person': false, "Remote": false },
    frequency: '3 ~ 5 / week',
    distance: 1
  },
  profile: {
    name: "",
    gender: "",
    age:"",
    bodyPart: [],
    hobbies: "",
    intro: "",
    pictureURL: [
      {url: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"}, 
      {url: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"}, 
      {url: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"}],
    frequency: "",
    experience: ""
  },
  partners: [{name: "", uid: "", img: "", chatID: ""}]
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case USER_PREF_CHANGE:
      return {
        ...state,
        pairingPref: action.pairingPref
      }
    case USER_PROFILE_CHANGE:
      return {
        ...state,
        profile: action.profile
      }
    case USER_PARTNER_CHANGE:
      return {
        ...state,
        partners: action.partners
      }
    case CLEAR_DATA:
      return initialState;
    default:
      return state
  }
}
