import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from "react-native"

import { fetchUser, fetchUserPref, fetchUserProfile, clearData } from '../../redux/actions/index';

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"


function EditProfile(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [pref, setPref] = useState({});

  useEffect(() => {
    const { currentUser, pairingPref, profile } = props;
    setUser(currentUser);
    setPref(pairingPref);
    setProfile(profile)
  }, [props.profile])

  console.log(profile)

  return (
    <View>

    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  pairingPref: store.userState.pairingPref,
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  // fetchUser, 
  // clearData, 
  // fetchUserPref,
  // fetchUserProfile 
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(EditProfile)
