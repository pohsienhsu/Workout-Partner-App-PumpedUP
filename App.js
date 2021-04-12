import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from "firebase";
import { firebaseConfig } from "./src/firebase/firebaseConfig";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

import IntroScreen from "./src/auth/Intro";
import RegisterScreen from "./src/auth/Register";
import LoginScreen from "./src/auth/Login";
import MainScreen from "./src/screens/MainScreen";
import PairUpScreen from "./src/screens/PairUpSuccess";
import InvitationScreen from "./src/screens/InvitationScreen";
import EditProfile from "./src/screens/EditProfile";
import ChatRoom from "./src/screens/ChatRoom";
import PairUpProfile from "./src/screens/PairUpProfile";

const store = createStore(rootReducer, applyMiddleware(thunk))

// not running firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state

    if (!loaded) {
      return (
        // <View style={{ justifyContent: "center", flex: 1, alignItems: 'center', backgroundColor: "#313A3A" }}>
        //   <Text style={{color: "#fff"}} >Loading...</Text>
        // </View>
        <View style={{ flex:1, paddingTop: 80, alignItems: "center", backgroundColor: "#313A3A" }}>
          <Text style={styles.heading} > PumpedUP </Text>
          <View>
            <Image
              style={{ height: 400, width: 350, marginTop: 40 }}
              source={require('./src/image/frontcharacter.png')}
            />
          </View>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} navigation={this.props.navigation} options={{
              headerShown: true, 
              title: "Create Account",
              headerStyle: {
                backgroundColor: '#313A3A',
              },
              headerTintColor: '#fff', }} />
            <Stack.Screen name="Login" component={LoginScreen} navigation={this.props.navigation} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation}
              options={{
                headerShown: true,
                title: "PumpedUp",
                headerStyle: {
                  backgroundColor: '#313A3A',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen name="PairUpProfile" component={PairUpProfile} navigation={this.props.navigation}
              options={{
                headerShown: true,
                title: "Profile",
                headerStyle: {
                  backgroundColor: '#313A3A',
                },
                headerTintColor: '#fff'
              }}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} navigation={this.props.navigation}
              options={{
                headerShown: true,
                title: "Edit Profile",
                headerStyle: {
                  backgroundColor: '#313A3A',
                },
                headerTintColor: '#fff'
              }}
            />
            <Stack.Screen name="PairUp" component={PairUpScreen} navigation={this.props.navigation}
              options={{
                headerShown: true,
                title: "PumpedUp",
                headerStyle: {
                  backgroundColor: '#313A3A',
                },
                headerTintColor: '#fff'
              }}
            />
            <Stack.Screen name="Invitation" component={InvitationScreen} navigation={this.props.navigation}
              options={{
                headerShown: true,
                title: "Match",
                headerStyle: {
                  backgroundColor: '#313A3A',
                },
                headerTintColor: '#fff'
              }}
            />
            <Stack.Screen name="ChatRoom" component={ChatRoom} navigation={this.props.navigation}
              options={{
                headerShown: true,
                title: "Chat",
                headerStyle: {
                  backgroundColor: '#313A3A',
                },
                headerTintColor: '#fff'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

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
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  }
})



