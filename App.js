import React, { Component } from 'react';
import { View, Text, TextInput } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from "firebase"
import { firebaseConfig } from "./src/firebase/firebaseConfig"

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers"
import thunk from "redux-thunk"

import LandingScreen from "./src/auth/Intro"
import RegisterScreen from "./src/auth/Register"
import LoginScreen from "./src/auth/Login"
import MainScreen from "./src/screens/MainScreen"

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
      loggedIn: false
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
        <View style={{ justifyContent: "center", flex: 1, alignItems: 'center' }}>
          <Text >Loading...</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} navigation={this.props.navigation} options={{ headerShown: false }}/>
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App



