import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Button, ScrollView } from "react-native"
import { FAB } from "react-native-paper"

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"

import { fetchUserProfile, fetchUser } from "../../redux/actions/index"

import ImageCarousel from '../components/imageCarousel'
import UserInfo from '../components/userInfo'

function Profile(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [pref, setPref] = useState({});

  useEffect(() => {

    if (props.currentUser === undefined) {
      props.fetchUser().then(() => {
        const { currentUser } = props;
        setUser(currentUser);
      })
    }

    const { currentUser, profile } = props;
    setUser(currentUser);
    setProfile(profile)

  }, [props.profile, props.profile.pictureURL[0].url, props.profile.pictureURL[1].url, props.profile.pictureURL[2].url])

  console.log(profile.bodyPart)

  const onLogout = () => {
    firebase.auth().signOut();
  }

  if (user === null || profile.pictureURL === null) {
    return <View style={styles.textContent}>
      <Text style={{ fontSize: 18 }}>Loading...</Text>
    </View>
  }

  return (
    <ScrollView style={styles.container}>
      <View>
      </View>
      <View style={{ flex: 1 }}>
        <ImageCarousel data={profile.pictureURL} />
      </View>
      <View>
        {/* <Text style={styles.title}> {profile.name} </Text>
        <Text style={styles.title}> {profile.intro} </Text>
        {/* <Text style={styles.title}> {profile.bodyPart[0]} </Text> */}
        {/* <Text style={styles.title}> {profile.gender} </Text> */}
        <UserInfo />
        <FAB
          style={styles.fab}
          small
          icon="pen"
          onPress={() => {
            props.navigation.navigate("EditProfile");
          }}
        />
      </View>
      <View>
        <Button
          title="Logout"
          onPress={() => onLogout()}
        />
      </View>
      <View style={{ marginTop: 100 }} />
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
  },
  textContent: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: -100
  },
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserProfile, fetchUser }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Profile)

// export default Profile