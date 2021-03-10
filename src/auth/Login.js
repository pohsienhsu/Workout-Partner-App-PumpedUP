import React, { Component } from 'react'
import { View, Button, TextInput, Text, StyleSheet } from "react-native"
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
        console.log(`${email} logs in successfully`)
        // console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // anytime the state above changes, the screen rerenders
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2 }}>

        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={{ color: "#fff", fontSize: 30, alignSelf: "center" }}> Login</Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder='email'
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
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
      </View>
    )
  }
}

export default Login

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
  }
})
