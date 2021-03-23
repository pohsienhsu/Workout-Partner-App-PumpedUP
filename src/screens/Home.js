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

// import firebase from 'firebase'
// require('firebase/firestore')
import { connect } from "react-redux"


function Home(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    const fetchPic = async () => {
      try {
        const response = await props.profile.pictureURL[0].url
        return response
      }
      catch (reject) {
        console.log(reject)
      }
    }
    fetchPic().then((data) => setAvatar(data))
    const { currentUser, profile } = props;
    setUser(currentUser);
    setProfile(profile);
    // setAvatar(props.profile.pictureURL[0].url)

  }, [props.currentUser, props.profile, avatar])


  if (user === null || avatar === null || profile === {}) {
    return <View style={styles.textContent}>
      <Text style={{ fontSize: 18 }}>Loading...</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profileImage}
          source={{ uri: avatar }}
        />
      </View>

      <View style={{ paddingTop: 50 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            props.navigation.navigate("Invitation")
          }}>
          <Text style={styles.boxText}>Beacon Match</Text>
          {/* <View style={{ paddingTop: 8 }} /> */}
          {/* <Text style={styles.ButtonText}>+1</Text> */}
        </TouchableOpacity>

        <View style={{ paddingLeft: 8 }} />

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            console.log(modalVisible)
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

export default connect(mapStateToProps, null)(Home)

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
