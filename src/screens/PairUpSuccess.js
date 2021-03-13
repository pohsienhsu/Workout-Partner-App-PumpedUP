import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from "react-native"

export default function PairUpSuccess(props) {

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.45 }}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fw19-trn-projrock-dj-03-0247-1587740368.jpg" }}
        />
      </View>
      <View style={{ flex: 0.1 }}>
        <Text style={styles.text}>Matched!</Text>
      </View>
      <View style={{ flex: 0.45 }}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://www.blackenterprise.com/wp-content/blogs.dir/1/files/2020/05/Kevin-Hart-Headshot-Kevin-Kwan-High-Res--scaled-e1589926838234.jpg" }}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EF9C2E",
    alignItems: "center"
  },
  profileImage: {
    margin: 20,
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold"
  }
})

