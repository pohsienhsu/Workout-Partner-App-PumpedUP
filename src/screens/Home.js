import React, { useState, useEffect } from 'react';
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
import { Icon } from 'react-native-elements';

import UserCard from "../components/userCard";

import firebase from 'firebase';
require('firebase/firestore');
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

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
  const [beaconMatch, setBeaconMatch] = useState({
    uid: '',
    name: 'No Matches Available',
    intro: '',
    img: '',
    gender: '',
    age: 20,
    hobbies: ''
  });
  const [modalVisible, setModalVisible] = useState(false);

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
  }, [props.currentUser, props.profile, avatar, props.partners, props.pairingPref, beaconMatch])

  // console.log("###################  HOME PAGE  ####################")
  // console.log(props.currentUser);
  // console.log(props)


  if (user === null) {
    return <View style={styles.textContent}>
      <Text style={{ fontSize: 18 }}>Loading...</Text>
    </View>
  }

  // let avatarURL = avatar ? avatar : require()


  const onSentInvitation = async (pairingUID) => {
    // console.log("#############  OnSentInvitation Function   ##############")
    // console.log(props);
    // const currentInvitations = await firebase.firestore()
    //   .collection("users")
    //   .doc(pairingUID)
    //   .collection("invitations")
    //   .doc(pairingUID)
    //   .update({
    //     invitation: firebase.firestore.FieldValue.arrayUnion({ uid: firebase.auth().currentUser.uid, name: profile.name })
    //   })
    try {
      const currentInvitations = await firebase.firestore()
        .collection("users")
        .doc(pairingUID)
        .collection("invitations")
        .doc(pairingUID)
        .get()

      const sentInvitations = await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("sentInvitations")
        .doc(firebase.auth().currentUser.uid)
        .get()

      let verify = 0

      for (let i = 0; i < currentInvitations.data().invitation.length; i++) {
        if (currentInvitations.data().invitation[i].uid == firebase.auth().currentUser.uid) {
          verify += 1
          break
        }
      }

      if (verify == 0) {
        await firebase.firestore()
          .collection("users")
          .doc(pairingUID)
          .collection("invitations")
          .doc(pairingUID)
          .set({
            invitation: [
              ...currentInvitations.data().invitation,
              { uid: firebase.auth().currentUser.uid, name: profile.name }
            ]
          })

        await firebase.firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("sentInvitations")
          .doc(firebase.auth().currentUser.uid)
          .set({
            uid: [
              ...sentInvitations.data().uid,
              pairingUID
            ]
          })
      }

      // await firebase.firestore()
      //   .collection("users")
      //   .doc(pairingUID)
      //   .collection("invitations")
      //   .doc(pairingUID)
      //   .set({
      //     invitation: [
      //       ...currentInvitations.data().invitation,
      //       { uid: firebase.auth().currentUser.uid, name: profile.name }
      //     ]
      //   })
    } catch (e) {
      await firebase.firestore()
        .collection("users")
        .doc(pairingUID)
        .collection("invitations")
        .doc(pairingUID)
        .set({
          invitation: [
            { uid: firebase.auth().currentUser.uid, name: profile.name }
          ]
        })
    }
  }

  // For Matching algorithm
  const total = 7;

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

            let alreadySent = { uid: [] };

            try {
              alreadySent = await firebase.firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("sentInvitations")
                .doc(firebase.auth().currentUser.uid)
                .get()
              alreadySent = alreadySent.data()
            }
            catch (e) {
              console.log("There is no already sent")
              alreadySent = { uid: [] };
            }

            // Get all users
            const users = await firebase.firestore()
              .collection("users")
              .get();

            console.log("#############################################################")
            console.log("################  Start of the Algorithm  ###################")
            console.log("#############################################################")
            // const forLoop = async () => {
            // for (let user of users) {
            users.forEach(async user => {

              const info = await firebase.firestore().collection("users").doc(user.id).collection("userProfile").doc(user.id).get();
              // console.log("Already Sent: ", alreadySent);
              if (info.exists && user.id != firebase.auth().currentUser.uid && !alreadySent.uid.includes(user.id)) {

                console.log("\n")
                console.log('User id: ', user.id, ' Data name:', info.data().name);

                let score = 0;

                // BodyPart is an array
                console.log("#############  users.forEach --> info  #############")
                info.data().bodyPart.forEach(bodyInfo => {
                  const bodyScore = 2.75 / pref.bodyPart.length;
                  try {
                    if (pref.bodyPart.includes(bodyInfo)) {
                      // console.log(`Algorithm BodyPart Successful: ${bodyInfo} / Score: ${score}`)
                      score += bodyScore;
                    }
                  }
                  catch (e) {
                    console.log(`Algorithm BodyPart Error: ${bodyInfo}`)
                  }
                })

                // 3/29 update matching algorithm
                // If testing check No.1 pass, check the following (testing check No.2)
                for (const [range, boolean] of Object.entries(pref.age)) {
                  if ((range == "18 ~ 25") && boolean) {
                    if ((info.data().age >= 18) && (info.data().age <= 25)) {
                      score += 1.5;
                      break;
                    }
                  }

                  if ((range == "26 ~ 35") && boolean) {
                    if ((info.data().age >= 26) && (info.data().age <= 35)) {
                      score += 1.5;
                      break;
                    }
                  }

                  if ((range == "36 ~ 45") && boolean) {
                    if ((info.data().age >= 36) && (info.data().age <= 45)) {
                      score += 1.5;
                      break;
                    }
                  }

                  if ((range == "46 ~ 60") && boolean) {
                    if ((info.data().age >= 46) && (info.data().age <= 60)) {
                      score += 1.5;
                      break;
                    }
                  }

                  if ((range == "> 60") && boolean) {
                    if (info.data().age > 60) {
                      score += 1.5;
                      break;
                    }
                  }
                }

                if ((info.data().experience) == pref.experience) {
                  score += 2.5;
                }

                if ((info.data().frequency) == pref.frequency) {
                  score += 2.25;
                }

                if (pref.gender[info.data().gender]) {
                  score += 2;
                }

                if (score >= total) {
                  console.log('User name: ', info.data().name, ", Score: ", score);

                  setBeaconMatch({
                    uid: user.id,
                    name: info.data().name,
                    age: info.data().age,
                    gender: info.data().gender,
                    img: info.data().pictureURL[0].url,
                    intro: info.data().intro,
                    hobbies: info.data().hobbies
                  })


                }
              }
            })

            modalVisible ? setModalVisible(false) : setModalVisible(true);

          }}>
          <Text style={styles.boxText}>Beacon Match</Text>
          {/* <View style={{ paddingTop: 8 }} /> */}
          {/* <Text style={styles.ButtonText}>+1</Text> */}
        </TouchableOpacity>

        <Modal transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
          <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
            <View style={styles.ModalBox}>
              <Image
                style={styles.ModalImage}
                source={beaconMatch.img == "" ? require("../image/default-profile-pic.png") : { uri: beaconMatch.img }}
              />

              <Text style={styles.ModalName}>{beaconMatch.name}</Text>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.ModalText}>{beaconMatch.intro}</Text>
              </View>

              {beaconMatch.uid != "" ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.ModalText}>Gender: {beaconMatch.gender}</Text>
                <Text style={styles.ModalText}>Age: {beaconMatch.age}</Text>
                <Text style={styles.ModalText}>Hobbies: {beaconMatch.hobbies}</Text>
              </View> : null}

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
              }}>
                <View style={styles.IconBoxCheck}>
                  <TouchableOpacity
                    style={styles.IconButton}
                    disabled={beaconMatch.uid == ""}
                    onPress={async () => {
                      setModalVisible(false);
                      onSentInvitation(beaconMatch.uid);
                      try {
                        const sentInvitations = await firebase.firestore()
                          .collection("users")
                          .doc(firebase.auth().currentUser.uid)
                          .collection("sentInvitations")
                          .doc(firebase.auth().currentUser.uid)
                          .get()

                        await firebase.firestore()
                          .collection("users")
                          .doc(firebase.auth().currentUser.uid)
                          .collection("sentInvitations")
                          .doc(firebase.auth().currentUser.uid)
                          .set({
                            uid: [
                              ...sentInvitations.data().uid,
                              beaconMatch.uid
                            ]
                          })
                      } catch (e) {
                        await firebase.firestore()
                          .collection("users")
                          .doc(firebase.auth().currentUser.uid)
                          .collection("sentInvitations")
                          .doc(firebase.auth().currentUser.uid)
                          .set({
                            uid: [
                              beaconMatch.uid
                            ]
                          })
                      }
                      setBeaconMatch({
                        uid: '',
                        name: 'No Matches Available',
                        intro: '',
                        img: '',
                        gender: '',
                        age: 20,
                        hobbies: ''
                      });
                    }}
                  >
                    <Icon name='check' color='green' />
                  </TouchableOpacity>
                </View>

                <View style={{ paddingLeft: 40 }} />

                <View style={styles.IconBoxClose}>
                  <TouchableOpacity style={styles.IconButton}
                    onPress={() => {
                      setModalVisible(false)
                    }}
                  >
                    <Icon name='close' color='red' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* <UserCard modalVisible setModalVisible={() => setModalVisible()} beaconMatch navigation={props.navigation} /> */}

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
            props.navigation.navigate("Invitation")
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
  pairingPref: store.userState.pairingPref,
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



const data = [
  {
    name: 'Conan O\'Brien',
    intro: 'If you can really laugh at yourself loud and hard every time you fail,\nPeople will think you\' drunk',
    img: 'https://tvline.com/wp-content/uploads/2020/11/conan-ending.jpg?',
    gender: 'Male',
    age: 57,
    weight: '190',
    hobby: 'Self pity'
  },
  {
    name: 'Kevin Hart',
    intro: 'Tallest and Fastest Man on Earth\nNever mess with me!',
    img: 'https://www.blackenterprise.com/wp-content/blogs.dir/1/files/2020/05/Kevin-Hart-Headshot-Kevin-Kwan-High-Res--scaled-e1589926838234.jpg',
    gender: 'Male',
    age: 40,
    weight: '150',
    hobby: 'Cat, Movies, Thug Life'
  },
  {
    name: 'Gordon Ramsay',
    intro: 'This lamb is so undercooked,\n it\'s following Mary to school!',
    img: 'https://www.telegraph.co.uk/content/dam/news/2016/09/29/6455882-ramsay-news_trans_NvBQzQNjv4BqbRF8GMdXQ5UNQkWBrq_MOBxo7k3IcFzOpcVpLpEd-fY.jpg',
    gender: 'Male',
    age: 54,
    weight: '200',
    hobby: 'Cook, Make adults cry'
  }
];

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
  },
  ModalBox: {
    flex: 1,
    marginTop: 80,
    marginBottom: 80,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 10,
    backgroundColor: '#EF9C2E',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ModalImage: {
    marginTop: 20,
    height: 160,
    width: 160,
    borderRadius: 150,
    alignSelf: "center"
  },
  ModalName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ModalText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 50
  },
  IconBoxCheck: {
    width: 54,
    height: 54,
    backgroundColor: 'green',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconBoxClose: {
    width: 54,
    height: 54,
    backgroundColor: 'red',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EF9C2E',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
