import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native"

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from "react-redux"

function Profile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { currentUser } = props;
    setUser(currentUser)

  })
    // Only re-run the effect if uid changes
  // }, [props.route.params.uid])

  const onLogout = () => {
    firebase.auth().signOut();
  }

  if (user === null) {
    return <View />
  }
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fw19-trn-projrock-dj-03-0247-1587740368.jpg" }}
          />
          <Text style={styles.title}> {user.name} </Text>
        </View>
        <View>
          <Button
            title="Logout"
            onPress={() => onLogout()}
          />
        </View>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  profileImage: {
    margin: 10,
    height: 300,
    width: 300,
    borderRadius: 150,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#313A3A"
  }
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
  // posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)

// export default Profile