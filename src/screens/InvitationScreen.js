import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native"

import { Icon } from 'react-native-elements'

import { ListItem, Avatar, SearchBar } from "react-native-elements"

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserProfile, fetchUserInvitation } from "../../redux/actions/index"

function InvitationScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({})
  const [allUser, setAllUser] = useState([])


  const deleteInvitations = async (pairingUID) => {
    try {
      // Delete Invitation from pairingUID
      let currentInvitation = await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("invitations")
        .doc(firebase.auth().currentUser.uid)
        .get()

      currentInvitation = currentInvitation.data().invitation
      console.log("Current Invitation: ", currentInvitation);

      let newInvitaion = []
      for (let i of currentInvitation) {
        if (i.uid !== pairingUID) {
          newInvitaion.push(i);
        }
      }

      await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("invitations")
        .doc(firebase.auth().currentUser.uid)
        .set({
          invitation: newInvitaion
        })

      setAllUser(newInvitaion);
      // Delete Sent Invitation from current user

    } catch (e) {
      console.log("[invitationScreen.js] deleteInvitations -> delete the invitation from the pairing user");
      console.log(e);
    }
  }

  const addFriend = async (pairingUID, parnterName, partnerImg) => {
    // Add current user
    currentName = profile.name.replace(/\s/g, '');
    parnterName = parnterName.replace(/\s/g, '');
    try {
      const currentParnter = await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("partners")
        .doc(firebase.auth().currentUser.uid)
        .get()

      await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("partners")
        .doc(firebase.auth().currentUser.uid)
        .set({
          partner: [
            ...currentParnter.data().partner,
            {
              chatID: `${currentName}and${parnterName}`,
              img: partnerImg,
              name: parnterName,
              uid: pairingUID
            }
          ]
        })
    } catch (e) {
      console.log(e);
      await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("partners")
        .doc(firebase.auth().currentUser.uid)
        .set({
          partner: [
            {
              chatID: `${currentName}and${parnterName}`,
              img: partnerImg,
              name: parnterName,
              uid: pairingUID
            }
          ]
        })
    }
    // Add the other user
    try {
      const currentParnter = await firebase.firestore()
        .collection("users")
        .doc(pairingUID)
        .collection("partners")
        .doc(pairingUID)
        .get()

      await firebase.firestore()
        .collection("users")
        .doc(pairingUID)
        .collection("partners")
        .doc(pairingUID)
        .set({
          partner: [
            ...currentParnter.data().partner,
            {
              chatID: `${currentName}and${parnterName}`,
              img: profile.pictureURL[0].url,
              name: profile.name,
              uid: firebase.auth().currentUser.uid
            }
          ]
        })
    } catch (e) {
      console.log(e);
      await firebase.firestore()
        .collection("users")
        .doc(pairingUID)
        .collection("partners")
        .doc(pairingUID)
        .set({
          partner: [
            {
              chatID: `${currentName}and${parnterName}`,
              img: profile.pictureURL[0].url,
              name: profile.name,
              uid: firebase.auth().currentUser.uid
            }
          ]
        })
    }
    // create chatroom backend
    try {
      await firebase.firestore()
        .collection("userChat")
        .doc(`${currentName}and${parnterName}`)
        .set({
          name: [currentName, parnterName]
        })
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // console.log("###########################################")

        // const invitations = await firebase.firestore()
        //   .collection("users")
        //   .doc(firebase.auth().currentUser.uid)
        //   .collection("invitations")
        //   .doc(firebase.auth().currentUser.uid)
        //   .get()
        // setAllUser(invitations.data().invitation);
        await props.fetchUserInvitation();
        setAllUser(props.invitations);
        await props.fetchUserProfile();
        setProfile(props.profile);

        // invitations.data().invitation.forEach(async user => {
        //   const info = await firebase.firestore().collection("users").doc(user.uid).collection("userProfile").doc(user.uid).get();
        //   if (info.exists) {
        //     console.log(info.data());
        //   }
        //   setAllUser([...allUser, [user.uid, info.data()]]);
        // });
      }
      catch (r) { };
    }

    fetchAllUsers()

  }, [props.invitations])

  // console.log(props.invitations)

  return (
    <View>
      {/* <Text>Number of Users {allUser.length}</Text> */}

      <SearchBar
        placeholder="Type Here..."
      />
      {
        allUser.map((l, i) => (
          <ListItem key={i} bottomDivider
            onPress={() => (
              modalVisible ? setModalVisible(false) : setModalVisible(true)
            )}
          >
            <Avatar source={{ uri: l.avatar }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.intro}</ListItem.Subtitle>
            </ListItem.Content>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
              <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View style={styles.ModalBox}>
                  <Image
                    style={styles.ModalImage}
                    source={{ uri: l.avatar }}
                  />

                  <Text style={styles.ModalName}>{l.name}</Text>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.ModalText}>{l.intro}</Text>
                  </View>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.ModalText}>Gender: {l.gender}</Text>
                    <Text style={styles.ModalText}>Age: {l.age}</Text>
                    <Text style={styles.ModalText}>Hobby: {l.hobbies}</Text>
                    <Text style={styles.ModalText}>Experience: {l.experience}</Text>
                    <Text style={styles.ModalText}>Frequency: {l.frequency}</Text>
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
                          setModalVisible(false)
                          deleteInvitations(l.uid);
                          addFriend(l.uid, l.name, l.avatar);
                          props.navigation.navigate("PairUp", { pairingImg: l.avatar });
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
                          // deleteInvitations(allUser[i][0]);
                        }}
                      >
                        <Icon name='close' color='red' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </ListItem>
        ))
      }
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  pairingPref: store.userState.pairingPref,
  profile: store.userState.profile,
  invitations: store.userState.invitations
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserInvitation, fetchUserProfile }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(InvitationScreen)

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