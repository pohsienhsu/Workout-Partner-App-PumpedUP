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
        <View style={{ flex: 0.8 }}>
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
          <TouchableOpacity>
            <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>Forget Password</Text>
          </TouchableOpacity>

          <View style={{paddingTop:10}} />

          <View 
            style={{
              width: 110, 
              height: 46, 
              backgroundColor:'orange',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              alignSelf: "center"
            }}
          >
            <TouchableOpacity
              style={ styles.LoginButton }
              onPress={() => this.onSignIn()}
            >
              <Text style={ styles.ButtonText }>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={{paddingTop:30}} />

          <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>Third Party Login</Text>
          <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
            -------------------------------------------------------------
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={this.loginWithFacebook}
            >
              Facebook
            </Icon.Button>

            <View style={{paddingLeft:5}} />

            <Icon.Button
              name="google"
              backgroundColor="green"
              onPress={this.loginWithGoogle}
            >
              Google
            </Icon.Button>

            <View style={{paddingLeft:5}} />

            <Icon.Button
              name="twitter"
              backgroundColor="steelblue"
              onPress={this.loginWithTwitter}
            >
              Twitter
            </Icon.Button>
          </View>

          <View style={{paddingTop:70}} />

          <View 
            style={{
              width: 180, 
              height: 46, 
              backgroundColor:'orange',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              alignSelf: "center"
            }}
          >
            <TouchableOpacity 
              style={ styles.CAButton }
              onPress={() => { navigation.navigate("Register") }}
            >
              <Text style={ styles.ButtonText }>Create Account</Text>
            </TouchableOpacity>
          </View>
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
