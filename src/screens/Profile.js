import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button, ScrollView } from "react-native"

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"

import { fetchUserProfile, curr } from "../../redux/actions/index"

import ImageCarousel from '../components/imageCarousel'

function Profile(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [pref, setPref] = useState({});

  useEffect(() => {
    const { currentUser, pairingPref, profile } = props;
    setUser(currentUser);
    setPref(pairingPref);
    setProfile(profile)
  }, [props.profile])

  console.log(profile.pictureURL)

  const onLogout = () => {
    firebase.auth().signOut();
  }

  if (user === null || profile.pictureURL === null) {
    return <View />
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <ImageCarousel data={profile.pictureURL}/>
          {/* <Image
            style={styles.profileImage}
            source={{ uri: profile.pictureURL[0] }}
          /> */}
          <Text style={styles.title}> {user.name} </Text>
          <Text style={styles.title}> {profile.intro} </Text>
          <Text style={styles.title}> {profile.bodyPart} </Text>
          <Text style={styles.title}> {profile.gender} </Text>
        </View>
        <View>
          <Button
            title="Logout"
            onPress={() => onLogout()}
          />
        </View>

      </View>

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center"
  },
  profileImage: {
    margin: 10,
    height: 400,
    width: 400,
    // borderRadius: 150,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#313A3A"
  }
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  pairingPref: store.userState.pairingPref,
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserProfile }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Profile)

// export default Profile