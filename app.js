// run 'npm start' in the path folder in terminal

import React, { Component } from 'react';
import { 
  StatusBar,
  StyleSheet, 
  Text, 
  View, //<div>
  SafeAreaView, // for iphone XR or later version
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { AppLoading, Asset, Font } from 'expo';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import Game from './Game'
import Card from './Card'
import Login from './Login'
import ApiKeys from './ApiKeys';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    // Initialize firebase...
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }
  
  render() {
    // if ( (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
    //   // return (
    //   //   <AppLoading
    //   //     startAsync={this._loadResourcesAsync}
    //   //     onError={this._handleLoadingError}
    //   //     onFinish={this._handleFinishLoading}
    //   //   />
    //   // );
    //   return (<Login/>)
    // } else {
    //   return (
    //     <View style={styles.container}>
    //       {(this.state.isAuthenticated) ? <Game /> : <Login />}
    //     </View>
    //   )
    // }
    return (
        <View style={styles.container}>
          {(this.state.isAuthenticated) ? <Game /> : <Login />}
        </View>
      )
  }
}

export default App

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'yellow',
  // },
  // header: {
  //   flex: 1,
  //   backgroundColor: '#eee',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // heading : {
  //   fontSize: 36,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // main: {
  //   flex: 3,
  //   backgroundColor: '#fff',
  // },
  // buttonText: {

  // },
  // footer: {
  //   flex: 1,
  //   backgroundColor: '#eee',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // footing : {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // gameBoard: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignContent: 'center',
  // },
  // button: {
  //   backgroundColor: '#ccc',
  //   borderRadius: 8,
  //   width: 48,
  //   height: 48,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: (Dimensions.get('window').width - (48*4)) / (5*2),
  // },
  // buttonText: {
  //   fontSize: 30,
  // },
  // tryAgainButton: {
  //   backgroundColor: 'steelblue',
  //   padding: 8,
  //   borderRadius: 8,
  //   marginTop: 20,
  // },
  // tryAgainButtonText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // }
})