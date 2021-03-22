import { USER_STATE_CHANGE, USER_PREF_CHANGE, CLEAR_DATA, USER_PROFILE_CHANGE } from "../constants"

const initialState = {
  currentUser: null,
  pairingPref: {
    gender: { Male: false, Female: false, Others: false },
    bodypart: [],
    experience: [],
    location: { 'In-Person': false, "Remote": false },
    frequency: '3 ~ 5 / week',
    distance: 1
  },
  profile: {}
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
    case CLEAR_DATA:
      return {
        currentUser: null,
        pairingPref: {
          gender: { Male: false, Female: false, Others: false },
          bodypart: [],
          experience: [],
          location: { 'In-Person': false, "Remote": false },
          frequency: '3 ~ 5 / week',
          distance: 1
        },
        profile: {}
      }
    default:
      return state
  }
}