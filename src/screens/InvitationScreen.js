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

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await firebase.firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          let usersData = snapshot.docs.map(doc => {
            const id = doc.id;
            return { id: id }
          })
          setAllUser(usersData);
        })
        console.log("###########################################")
        console.log(allUser);
      }
      catch(r) {};   
    }

    fetchAllUsers()

  }, [])


  return (
    <View>
      <Text>Number of Users {allUser.length}</Text>
      
      <SearchBar
        placeholder="Type Here..."
      />
      {
        data.map((l, i) => (
          <ListItem key={i} bottomDivider
            onPress={() => (
              modalVisible ? setModalVisible(false) : setModalVisible(true)
            )}
          >
            <Avatar source={{ uri: l.img }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.intro}</ListItem.Subtitle>
            </ListItem.Content>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
              <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View style={styles.ModalBox}>
                  <Image
                    style={styles.ModalImage}
                    source={{ uri: data[1].img }}
                  />

                  <Text style={styles.ModalName}>{data[1].name}</Text>

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
                      <TouchableOpacity style={styles.IconButton}>
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