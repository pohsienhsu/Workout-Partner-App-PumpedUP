import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native"
import { FAB } from "react-native-paper"

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"

import { fetchUserProfile, fetchUser } from "../../redux/actions/index"

import ImageCarousel from '../components/imageCarousel'
import UserInfo from '../components/userInfo'
import { colors } from "../styles/index.styles"

function PairUpProfile(props) {
  // const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [picURL, setPicURL] = useState([]);

  useEffect(() => {

    // const fetchData = async () => {
    //   try {
    //     await props;
    //     await props.fetchUserPartner();
    //     const { currentUser, profile } = props;
    //     setUser(currentUser);
    //     setProfile(profile);
    //     setAvatar(profile.pictureURL[0].url)
    //   }
    //   catch (reject) { }
    // }

    const fetchProfile = async () => {
      try {
        let data = await firebase.firestore()
        .collection("users")
        .doc(props.route.params.beaconMatchUID)
        .collection("userProfile")
        .doc(props.route.params.beaconMatchUID)
        .get()
        
        setProfile(data.data());
        setPicURL(data.data().pictureURL);
      }
      catch (r) { }
    }
    
    // null or undefined
    // if (props.currentUser == null) {
    //   const fetchUserData = async () => {
    //     try {
    //       await props.fetchUser()
    //       setUser(props.currentUser);
    //       console.log("currentUser: ", props.currentUser);
    //     }
    //     catch (e) {
    //       console.log(e);
    //     }
    //   }
    //   fetchUserData();
    // }
    // // if user exists
    // else {
    fetchProfile()
    // }

  }, [])

  console.log("###################  PairUpProfile  ###################")
  // console.log(picURL);
  // console.log("Frequency:" + profile.frequency);

  // const onLogout = () => {
  //   firebase.auth().signOut();
  // }

  console.log(profile);

  if (picURL.length === 0) {
    return <View style={styles.textContent}>
      <Text style={{ fontSize: 18 }}>Loading...</Text>
    </View>
  }

  

  return (
    <ScrollView style={styles.container}>
      <View>
      </View>
      <View style={{ flex: 1 }}>
        <ImageCarousel data={picURL} />
      </View>

      <View style={styles.fabContainer}>
        <Text style={styles.Title}>Profile</Text>
        {/* <FAB
          style={styles.fab}
          small
          icon="pen"
          onPress={() => {
            props.navigation.navigate("EditProfile");
          }}
        /> */}
      </View>

      <View>
        <UserInfo profile={profile} />
      </View>

      {/* <View style={styles.logOutBtn}>
        <TouchableOpacity
          onPress={() => onLogout()}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "500" }}>Logout</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ marginTop: 100, backgroundColor: "#fff" }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textContent: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  },
  fab: {
    backgroundColor: colors.uiGray,
    shadowOpacity: 0
    // alignSelf: "flex-end"
  },
  Title: {
    fontSize: 28,
    alignSelf: "stretch",
    fontWeight: "bold",
    color: "#313A3A"
  },
  fabContainer: {
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    paddingVertical: '3%',
    backgroundColor: "#fff"
  },
  logOutBtn: {
    alignSelf: 'center',
    width: 100,
    height: 46,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
})

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
//   profile: store.userState.profile
// })
// const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserProfile, fetchUser }, dispatch);
// export default connect(mapStateToProps, mapDispatchProps)(PairUpProfile)

export default PairUpProfile