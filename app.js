import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from "firebase"

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./redux/reducers"
import thunk from "redux-thunk"

import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import LoginScreen from "./components/auth/Login"
import MainScreen from "./components/Main"

const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHAa1k7rYagsv1UUCK5Kci65jKY1tA1DQ",
  authDomain: "instagram-clone-77b2e.firebaseapp.com",
  projectId: "instagram-clone-77b2e",
  storageBucket: "instagram-clone-77b2e.appspot.com",
  messagingSenderId: "1036943764922",
  appId: "1:1036943764922:web:7619f9493db8b055c28183",
  measurementId: "G-5HNCXXG7ZQ"
};

// not running firebase
// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig)
// }

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   loaded: false
    // }
  }

  componentDidMount() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (!user) {
    //     this.setState({
    //       loggedIn: false,
    //       loaded: true
    //     })
    //   } else {
    //     this.setState({
    //       loggedIn: true,
    //       loaded: true
    //     })
    //   }

    // })
  }

  render() {
    // const { loggedIn, loaded } = this.state

    // if (!loaded) {
    //   return (
    //     <View style={{ justifyContent: "center", flex: 1, alignItems: 'center' }}>
    //       <Text >Loading...</Text>
    //     </View>
    //   )
    // }

    // if (!loggedIn) {
    //   return (
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName="Landing">
    //         <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="Register" component={RegisterScreen} />
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   );
    // }

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



