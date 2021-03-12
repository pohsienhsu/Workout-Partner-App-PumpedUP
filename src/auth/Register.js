import React, { Component } from 'react'
import {
  SafeAreaView, // for iphone XR or later version 
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity
} from "react-native"
import firebase from "firebase"

import Icon from 'react-native-vector-icons/FontAwesome';

// solve firebase.firestore is not a function issue
require("firebase/firestore")

export class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: ''
    }

    // very important
    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    const { email, password, name } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })

        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })

    // this.props.navigation.navigate("Login")
  }

  // anytime the state above changes, the screen rerenders
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2 }}>

        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={{ color: "#fff", fontSize: 30, alignSelf: "center" }}> Sign Up </Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder='name'
            onChangeText={(name) => this.setState({ name: name })}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder='email'
            onChangeText={(email) => this.setState({ email: email })}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password: password })}
          />

          <View style={{ paddingTop: 10 }} />

          <View style={{ paddingTop: 30 }} />

          <View style={{ paddingTop: 70 }} />

          <View
            style={{
              width: 180,
              height: 46,
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              alignSelf: "center"
            }}
          >
            <TouchableOpacity
              style={styles.CAButton}
              onPress={() => { this.onSignUp() }}
            >
              <Text style={styles.ButtonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    backgroundColor: "#313A3A"
  },
  textInput: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 45,
    marginBottom: 15,
    color: "black",
    fontSize: 20
  },
  LoginButton: {
    width: 104,
    backgroundColor: '#313A3A',
    borderRadius: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CAButton: {
    width: 174,
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
