import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import BeaconCheckBox from "./BeaconCheckBox"

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
  const [hobbies, setHobbies] = useState("");
  const [intro, setIntro] = useState("");
  const [name, setName] = useState("");



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
      setHobbies(props.profile.hobbies);
      setIntro(props.profile.intro);
      setName(props.profile.name);
    })
  }, [props.profile])

  let workoutBody = "";
  let arr = bodyPart;
  arr.forEach((bp) => {
    workoutBody += `${bp.charAt(0).toUpperCase() + bp.slice(1)}\n`
  })
  workoutBody = workoutBody.trim()

  return (
    <ScrollView style={styles.view}>

      {/* <View style={styles.container}>
        <Text style={styles.Title}>Profile</Text>
      </View> */}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.content}>{name}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Age</Text>
        <Text style={styles.content}>{age}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Gender</Text>
        <Text style={styles.content}>{gender}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.content}>{intro}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Hobbies</Text>
        <Text style={styles.content}>{hobbies}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.Title}>Workout Info</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>BodyPart</Text>
        <Text style={styles.content}>{workoutBody}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Experience</Text>
        <Text style={styles.content}>{experience}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Frequency</Text>
        <Text style={styles.content}>{frequency}</Text>
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
  contentContainer: {
    marginBottom: 20,
    marginHorizontal: '10%',
    // backgroundColor: "red",
    borderRadius: 10,
    // padding: 5
  },
  container: {
    marginTop: 20,
    marginHorizontal: '10%',
  },
  Title: {
    fontSize: 28,
    alignSelf: "stretch",
    fontWeight: "bold",
    color: "#313A3A",
    marginBottom: '3%'
  },
  title: {
    alignSelf: "stretch",
    fontSize: 20,
    color: "#EF9C2E",
    fontWeight: "bold"
  },
  content: {
    fontSize: 20,
    color: "black",
    // marginRight: "10%"
  }
})