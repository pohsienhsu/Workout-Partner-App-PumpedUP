import React from 'react'
import { View, Text, StyleSheet, Button } from "react-native"

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} > PumpedUP </Text>
      {/* <Button
        title="Register"
        onPress={() => { navigation.navigate("Register") }}
      /> */}
      <Button
        title="Let's get PUMPED!"
        onPress={() => { navigation.navigate("Login") }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#313A3A"
  },
  title: {
    alignSelf: "center",
    fontSize: 36,
    color: "#fff"
  }

})
