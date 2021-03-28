import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text
} from "react-native"

import { ListItem, Avatar, SearchBar } from "react-native-elements"

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserPartner } from "../../redux/actions/index"

function Partners(props) {

  const [partners, setPartners] = useState([]);
  console.log(partners)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.fetchUserPartner();
        setPartners(props.partners);
      }
      catch (r) { };
    }

    fetchData();

  }, [])


  if (partners === null) {
    return <View style={styles.textContent}>
      <Text style={{ fontSize: 18 }}>Loading...</Text>
    </View>
  }



  return (
    <View>

      {/* <SearchBar
        placeholder="Type Here..."
      /> */}
      {/* <ChatList
        partners={partners}
      /> */}
      {
        partners.map((l, i) => (
          <ListItem key={i} bottomDivider
          onPress={() => {
            console.log("######## chat List########")
            console.log(l.chatID)
            props.navigation.navigate("ChatRoom", {chatID: l.chatID})
          }}
          >
            <Avatar source={{ uri: l.img }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              {/* <ListItem.Subtitle>{l.intro}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  partners: store.userState.partners
  // pairingPref: store.userState.pairingPref,
  // profile: store.userState.profile,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserPartner }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Partners)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContent: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  }
})