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
import { fetchUserPref } from "../../redux/actions/index"

function InvitationScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [allUser, setAllUser] = useState([])
  const [currUser, setCurrUser] = useState([])

  const deleteInvitations = async (pairingUID) => {

    try {
      // Delete Invitation from pairingUID

      // Delete Sent Invitation from current user

    } catch (e) {
      console.log(e);
    }
  }

  const addFriend = async (pairingUID) => {

    try {
      // Make each other friends

    } catch (e) {
      console.log(e);
    }
  } 

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        console.log("###########################################")

        const invitations = await firebase.firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("invitations")
          .doc(firebase.auth().currentUser.uid)
          .get()

        invitations.data().invitation.forEach(async user => {
          const info = await firebase.firestore().collection("users").doc(user.uid).collection("userProfile").doc(user.uid).get();
          if (info.exists) {
            console.log(info.data());
          }
          setAllUser([...allUser, [user.uid, info.data()]]);
        });
      }
      catch(r) {};   
    }

    fetchAllUsers()

  }, [])


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
            <Avatar source={{ uri: l[1].pictureURL[0].url }} />
            <ListItem.Content>
              <ListItem.Title>{l[1].name}</ListItem.Title>
              <ListItem.Subtitle>{l[1].intro}</ListItem.Subtitle>
            </ListItem.Content>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
              <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View style={styles.ModalBox}>
                  <Image
                    style={styles.ModalImage}
                    source={{ uri: allUser[i][1].pictureURL[0].url }}
                  />

                  <Text style={styles.ModalName}>{allUser[i][1].name}</Text>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.ModalText}>{allUser[i][1].intro}</Text>
                  </View>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.ModalText}>Gender: {allUser[i][1].gender}</Text>
                    <Text style={styles.ModalText}>Age: {allUser[i][1].age}</Text>
                    {/* <Text style={styles.ModalText}>Weight: {allUser[i][1].weight} lb</Text> */}
                    <Text style={styles.ModalText}>Hobby: {allUser[i][1].hobbies}</Text>
                    <Text style={styles.ModalText}>Experience: {allUser[i][1].experience}</Text>
                    <Text style={styles.ModalText}>Frequency: {allUser[i][1].frequency}</Text>
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
                          // deleteInvitations(allUser[i][0]);
                          // addFriend(allUser[i][0]);
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
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({}, dispatch);
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