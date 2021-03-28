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
import { Icon } from 'react-native-elements'

import { fetchUser, fetchUserPref, fetchUserProfile, clearData } from '../../redux/actions/index';

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"

const renderImage = (avatar) => {
  if (avatar) {
    return (
      <View>
        <Image
          style={styles.profileImage}
          source={{ uri: avatar }} />
      </View>
    );
  } else {
    return (
      <View>
        <Image
          style={styles.profileImage}
          source={require("../image/default-profile-pic.png")} />
      </View>
    );
  }
}


function Home(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [pref, setPref] = useState({})
  const [avatar, setAvatar] = useState(null)

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props
        // await props.fetchUserProfile();
      }
      catch (reject) { }
    }

    if (props.currentUser === undefined) {
      props.fetchUser().then(() => {
        const { currentUser } = props;
        setUser(currentUser);
      })
    }

    fetchData().then(() => {
      const { currentUser, pairingPref, profile } = props;
      setPref(pairingPref);
      setUser(currentUser);
      setProfile(profile);
      try {
        setAvatar(profile.pictureURL[0].url)
      }
      catch (reject) {
      }
    })

}, [props.currentUser, props.profile, props.pairingPref, avatar])

console.log("###################  HOME PAGE  ####################")
console.log(profile.pictureURL);


if (user === null) {
  return <View style={styles.textContent}>
    <Text style={{ fontSize: 18 }}>Loading...</Text>
  </View>
}

// let avatarURL = avatar ? avatar : require()

const total = 5;
const MatchPPL = 'Kevin Hart';

return (
  <View style={styles.container}>
    {renderImage(avatar)}
    <View style={{ paddingTop: 50 }} />

    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity
        style={styles.Button}
        onPress={async () => {
          // Open Navigation menu
          // props.navigation.navigate("Invitation")

          modalVisible ? setModalVisible(false) : setModalVisible(true)

          // const currUserPref = await firebase.firestore()
          //   .collection("users")
          //   .doc(firebase.auth().currentUser.uid)
          //   .collection("userPref")
          //   .doc(firebase.auth().currentUser.uid)
          //   .get()

          // Get all users
          const users = await firebase.firestore()
            .collection("users")
            // .where('name', '==', 'Kevin Hart')
            .get();

          users.forEach(async user => {
            const info = await firebase.firestore().collection("users").doc(user.id).collection("userProfile").doc(user.id).get();
            const score = 0;

            if (info.exists && user.id != firebase.auth().currentUser.uid) {
              // BodyPart is an array
              console.log(info.get("bodyPart"))
              info.get("bodyPart").forEach(async eachInfo => {
                if (eachInfo.get("bodyPart").includes(pref.get("bodyPart")[0])) {
                  score += 2.75;
                }
              })

              if (eachInfo.get("experience") == pref.get("experience")) {
                score += 2.5;
              }

              if (eachInfo.get("frequency") == pref.get("frequency")) {
                score += 2.25;
              }

              if (pref.get("gender")[eachInfo.get("gender")]) {
                score += 2;
              }

              if (score == total) {
                MatchPPL = eachInfo.get("name");
              }

              // For testing check
              if (info.get("age") == "42") {
                console.log('User id: ', user.id, ' Data:', info.data());
                // Load
              }
            }
          })

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
              source={{ uri: data[1].img }}
            />

            <Text style={styles.ModalName}>{MatchPPL}</Text>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.ModalText}>{data[1].intro}</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.ModalText}>Gender: {data[1].gender}</Text>
              <Text style={styles.ModalText}>Age: {data[1].age}</Text>
              <Text style={styles.ModalText}>Weight: {data[1].weight} lb</Text>
              <Text style={styles.ModalText}>Hobby: {data[1].hobby}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <View style={styles.IconBoxCheck}>
                <TouchableOpacity
                  style={styles.IconButton}
                  onPress={() => {
                    props.navigation.navigate("PairUp");
                    setModalVisible(false)
                  }}
                >
                  <Icon name='check' color='green' />
                </TouchableOpacity>
              </View>

              <View style={{ paddingLeft: 40 }} />

              <View style={styles.IconBoxClose}>
                <TouchableOpacity
                  style={styles.IconButton}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                >
                  <Icon name='close' color='red' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ paddingLeft: 8 }} />

      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          props.navigation.navigate("Invitation")
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
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUser, 
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
