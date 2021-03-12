import React from 'react'
import {
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  Button,
  TouchableOpacity
} from "react-native"

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop:160, alignItems:"center"}}>
        <Text style={styles.heading} > PumpedUP </Text>

        <View style={{paddingTop:160}} />

        <View 
          style={{
            width: 200, 
            height: 46, 
            backgroundColor:'orange',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={ styles.Button }
            onPress={() => { navigation.navigate("Login") }}
          >
            <Text style={ styles.ButtonText }>Let's get PUMPED!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313A3A"
  },
  title: {
    alignSelf: "center",
    fontSize: 36,
    color: "#fff"
  },
  heading : {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  },
  Button: {
    width: 194,
    backgroundColor: '#313A3A',
    borderRadius: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  },
})
