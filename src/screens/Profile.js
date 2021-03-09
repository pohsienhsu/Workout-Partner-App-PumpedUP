import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from "react-native"

import { connect } from "react-redux"

export function Profile(props) {
  // const { currentUser, posts } = props
  // console.log({ currentUser, posts })
  return (
    <View>
      <Text> Profile </Text>
    </View>
  )
}

const styles = StyleSheet.create({
})

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
//   posts: store.userState.posts
// })

// export default connect(mapStateToProps, null)(Profile)

export default Profile