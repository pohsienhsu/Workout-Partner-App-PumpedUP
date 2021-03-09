import React, { Component } from 'react'
import { View, Button, TextInput, Text } from "react-native"
import firebase from "firebase"

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
  }

  // anytime the state above changes, the screen rerenders
  render() {
    return (
      <View>
        <TextInput
          placeholder='name'
          onChangeText={(name) => this.setState({ name: name })}
        />
        <TextInput
          placeholder='email'
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          // customize SignUp function
          onPress={() => this.onSignUp()}
          title="Sign Up"
        />
      </View>
    )
  }
}

export default Register
