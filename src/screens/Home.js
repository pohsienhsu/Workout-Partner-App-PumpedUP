import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  addons,
} from "react-native"
import { fetchUser, fetchUserPref, fetchUserProfile, fetchUserPartner, clearData } from '../../redux/actions/index';

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"

const renderImage = (avatar) => {
  console.log("Avatar: ", avatar);
  if (avatar) {
    <View>
      <Image
        style={styles.profileImage}
        source={{ uri: avatar }} />
    </View>
  } else {
    <View>
      <Image
        style={styles.profileImage}
        source={require("../image/default-profile-pic.png")} />
    </View>
  }
}

// const defaultUserAvatar = "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640";


function Home(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [avatar, setAvatar] = useState(null);
  const [pref, setPref] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props;
        // await props.fetchUserPartner();
        const { currentUser, profile, pairingPref } = props;
        setUser(currentUser);
        setProfile(profile);
        setPref(pairingPref);
        setAvatar(profile.pictureURL[0].url);
      }
      catch (reject) { }
    }

    // null or undefined
    if (props.currentUser == null) {
      const fetchUserData = async () => {
        try {
          await props.fetchUser();
          setUser(props.currentUser);
          console.log("currentUser: ", props.currentUser);
        }
        catch (e) {
          console.log(e);
        }
      }
      fetchUserData();
    }
    // if user exists
    else {
      console.log("currentUser: ", props.currentUser);
      fetchData();
    }
  }, [props.currentUser, props.profile, avatar, props.partners, props.pairingPref])

  // console.log("###################  HOME PAGE  ####################")
  // console.log(props.currentUser);
  // console.log(props.partners)


  if (user === null) {
    return <View style={styles.textContent}>
      <Text style={{ fontSize: 18 }}>Loading...</Text>
    </View>
  }

  // let avatarURL = avatar ? avatar : require()

  // For testing fetch data
  const MatchPPL = 'Kevin Hart';

  return (
    <View style={styles.container}>
      {/* {renderImage(avatar)}   */}
      <View>
        <Image
          style={styles.profileImage}
          source={{ uri: avatar }} />
      </View>
      <View style={{ paddingTop: 50 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.Button}
          onPress={async () => {
            // Open Navigation menu
            props.navigation.navigate("Invitation")

            const currUserPref = await firebase.firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection("userPref")
              .doc(firebase.auth().currentUser.uid)
              .get()

            // Get all users
            const users = await firebase.firestore()
              .collection("users")
              .where('name', '==', 'Kevin Hart')
              .get();

            const total = 5;

            users.forEach(async user => {
              const info = await firebase.firestore().collection("users").doc(user.id).collection("userProfile").doc(user.id).get();
              if (info.exists && user.id != firebase.auth().currentUser.uid) {
                // if (info.get("age") == "42") {
                //   console.log('User id: ', user.id, ' Data:', info.data());
                //   // Load
                // }

                // 3/28 15:00 Paste on start
                const score = 0;
                
                // BodyPart is an array
                console.log("#############  users.forEach --> info  #############")
                console.log("Current User: ", user);
                console.log("Current UserPref: ", pref.bodyPart);
                console.log("Potential Partner: ", info.data().name)
                console.log("Potential Partner's Body Part", info.data().bodyPart);
                info.data().bodyPart.forEach(async bodyInfo => {
                  try {
                    if (pref.bodyPart.includes(bodyInfo)){
                      console.log(`Algorithm BodyPart Successful: ${eachInfo} / Score: ${score}`)
                      score += 2.75;
                    }
                  }
                  catch (e) {
                    console.log(`Algorithm BodyPart Error: ${eachInfo}`)
                  }
                })

                // if (info.data().experience) == pref.get("experience")) {
                //   score += 2.5;
                // }

                // if (info.data().frequency) == pref.get("frequency")) {
                //   score += 2.25;
                // }

                // if (info.data().gender)[eachInfo.get("gender")]) {
                //   score += 2;
                // }

                // if (score >= total) {
                //   MatchPPL = eachInfo.get("name");
                  // console.log('User name: ', MatchPPL);
                // }

                // 3/28 15:00 Paste on end

                // For testing check
                // if (info.get("age") == "42") {
                  // console.log('User id: ', user.id, ' Data:', info.data());
                  // Load
                // }
              }
            })

          }}>
          <Text style={styles.boxText}>Beacon Match</Text>
          {/* <View style={{ paddingTop: 8 }} /> */}
          {/* <Text style={styles.ButtonText}>+1</Text> */}
        </TouchableOpacity>

        <View style={{ paddingLeft: 8 }} />

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            // console.log(modalVisible)
            // if (modalVisible.localeCompare('none') == 0) {
            //   setModalVisible('flex');
            // } else if (modalVisible.localeCompare('flex') == 0) {
            //   setModalVisible('none');
            // }
            // props.navigation.navigate("Invitation")
          }
          }
        >
          <Text style={styles.boxText}>Invitation</Text>
          {/* <View style={{ paddingTop: 8 }} />
          <Text style={styles.ButtonText}>+3</Text> */}
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 8 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', diaplay: "flex" }}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.boxText}>Daily Goal</Text>
          {/* <View style={{ paddingTop: 8 }} />
          <Text style={styles.ButtonText}>+2</Text> */}
        </TouchableOpacity>

        <View style={{ paddingLeft: 8 }} />

        <TouchableOpacity style={styles.Button}>
          <Text style={styles.boxText}>Schedule</Text>
          {/* <View style={{ paddingTop: 8 }} />
          <Text style={styles.ButtonText}>+0</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  profile: store.userState.profile,
  pairingPref: store.userState.profile,
  partners: store.userState.partners
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchUserPartner
  // clearData, 
  // fetchUserPref,
  // fetchUserProfile
}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileImage: {
    margin: 10,
    height: 300,
    width: 300,
    borderRadius: 150,
    alignSelf: "center"
  },
  box: {
    width: 160,
    height: 80,
    backgroundColor: '#313A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  },
  Button: {
    width: 160,
    height: 80,
    backgroundColor: '#313A3A',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  },
  textContent: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  }
})
