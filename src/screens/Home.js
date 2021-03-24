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
import { fetchUser, fetchUserPref, fetchUserProfile, clearData } from '../../redux/actions/index';

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
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props
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
      const { currentUser, profile } = props;
      setUser(currentUser);
      setProfile(profile);
      try {
        setAvatar(profile.pictureURL[0].url)
      }
      catch (reject) {
      }
    })

}, [props.currentUser, props.profile, avatar])


if (user === null) {
  return <View style={styles.textContent}>
    <Text style={{ fontSize: 18 }}>Loading...</Text>
  </View>
}

// let avatarURL = avatar ? avatar : require()

return (
  <View style={styles.container}>
    {renderImage(avatar)}
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
