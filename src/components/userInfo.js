import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import BeaconCheckBox from "../components/beaconCheckBox"

import {
  Dropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
// https://reactnativeexample.com/a-simple-and-customizable-react-native-dropdown-created-using-react-native-modal/

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserProfile } from "../../redux/actions/index"


function UserInfo(props) {
  const [age, setAge] = useState(0);
  const [bodyPart, setBodyPart] = useState([]);
  const [experience, setExperience] = useState("");
  const [frequency, setFrequency] = useState("");
  const [gender, setGender] = useState("Male");
  const [habit, setHabit] = useState("");
  const [intro, setIntro] = useState("");
  const [name, setName] = useState("");
  const [pics, setPics] = useState([]);


  useEffect(() => {
    const getProfileData = async () => {
      await props.profile;
    }

    getProfileData().then(() => {
      setAge(props.profile.age);
      setGender(props.profile.gender);
      setBodyPart(props.profile.bodyPart);
      setExperience(props.profile.experience);
      setFrequency(props.profile.frequency);
      setHabit(props.profile.habit);
      setIntro(props.profile.intro);
      setName(props.profile.name);
    })
  }, [props.profile])

  return (
    <ScrollView style={styles.view}>

      <View style={styles.container}>
        <Text style={styles.Title}>Profile</Text>
      </View>

      <View style={styles.container}>
        <Text ></Text>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{age}, {gender}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Intro: {intro}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Workout Body Part: {bodyPart}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Experience: {experience}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Frequency: {frequency}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Habit: {habit}</Text>
      </View>

      <View style={{ height: 50 }}></View>
    </ScrollView >
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  profile: store.userState.profile,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(UserInfo);

const colors = {
  uiGray: '#313A3A',
  black: '#1a1917',
  gray: '#888888',
  uiYellow: "#EF9C2E",
  background1: '#B721FF',
  background2: '#21D4FD'
}


// StyleSheet
const styles = StyleSheet.create({
  view: {
    // flex: 1,
    backgroundColor: "#fff",
    marginVertical: 0,
  },
  container: {
    marginTop: 20,
    marginHorizontal: '10%'
  },
  Title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#313A3A"
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    color: "#EF9C2E",
    fontWeight: "bold"
  }
})