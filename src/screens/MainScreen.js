import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts, clearData } from '../../redux/actions/index';

import firebase from 'firebase'

import HomeScreen from "./Home";
import BeaconScreen from "./Beacon";
import ProfileScreen from "./Profile";
import PairUpSuccess from "./PairUpSuccess"

const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
  return null
}

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser()
    this.props.clearData()
    // this.props.fetchUserPosts()
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
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Inbox" component={EmptyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="inbox" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          // fetch user data before navigating to the profile page
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
  currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, clearData }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)

// export default Main