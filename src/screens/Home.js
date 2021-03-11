import React from 'react'
import { View, Text, StyleSheet, Image, Button } from "react-native"

export default function Home(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fw19-trn-projrock-dj-03-0247-1587740368.jpg" }}
        />
      </View>
      <View>
        <Button
          title="Yes"
          onPress={() => props.navigation.navigate("PairUp")}
        />
      </View>
    </View>
  )
}

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
  }
})
