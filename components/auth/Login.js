import React, { Component } from 'react'
import { View, Button, TextInput, Text } from "react-native"
import firebase from "firebase"

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    // very important
    this.onSignIn = this.onSignIn.bind(this)
  }

  onSignIn() {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
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
          onPress={() => this.onSignIn()}
          title="Sign In"
        />
      </View>
    )
  }
}

export default Login
