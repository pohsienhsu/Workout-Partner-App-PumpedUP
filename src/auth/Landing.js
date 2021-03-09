import React from 'react'
import { View, Text, StyleSheet, Button } from "react-native"

export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => { navigation.navigate("Register") }}
      />
      <Button
        title="Login"
        onPress={() => { navigation.navigate("Login") }}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})
