import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPref, fetchUserProfile, clearData, fetchUserPartner, fetchUserInvitation } from '../../redux/actions/index';

import firebase from 'firebase'

import HomeScreen from "./Home";
import BeaconScreen from "./Beacon";
import ProfileScreen from "./Profile";
import Partners from "./Partners"

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
  return null
}

export class Main extends Component {
  
  componentDidMount() {
    this.props.clearData()
    this.props.fetchUser()
    this.props.fetchUserPref()
    this.props.fetchUserProfile()
    this.props.fetchUserPartner()
    this.props.fetchUserInvitation()
  }

  render() {

    return (
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#313A3A', paddingBottom: 10 }}
      >
        <Tab.Screen name="Home" component={HomeScreen} navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Beacon" component={BeaconScreen} navigation={this.props.navigation}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Beacon", { uid: firebase.auth().currentUser.uid })
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Partners" component={Partners}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="users" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          // passing user data to the profile page
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Setting" component={EmptyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  pairingPref: store.userState.pairingPref,
  profile: store.userState.profile
})

const mapDispatchProps = (dispatch) => bindActionCreators({ 
  fetchUser, 
  clearData, 
  fetchUserPref,
  fetchUserProfile,
  fetchUserPartner,
  fetchUserInvitation
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)

// export default Main