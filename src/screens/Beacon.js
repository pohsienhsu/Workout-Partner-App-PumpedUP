import React, { cloneElement, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from "react-native-elements";
import { RadioButton } from 'react-native-paper';
import BeaconCheckBox from "../components/beaconCheckBox "

import ModalDropdown from 'react-native-modal-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
// https://reactnativeexample.com/a-picker-dropdown-component-for-react-native/

export default function Beacon() {
  const [gender, setGender] = useState({ Male: false, Female: false, Others: false });
  const [bodyPart, setBodyPart] = useState({
    chest: false,
    legs: false,
    shoulders: false,
    back: false,
    core: false,
    arms: false,
    others: false
  })

  // console.log(gender)
  // console.log(bodyPart)

  return (
    <ScrollView style={styles.view}>

      <View style={styles.container}>
        <Text style={{ fontSize: 28, alignSelf: "center" }}>Pairing Preference</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Gender</Text>
        <BeaconCheckBox
          option="Male"
          state={gender}
          setState={setGender}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="Female"
          state={gender}
          setState={setGender}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="Others"
          state={gender}
          setState={setGender}
          containerStyle={styles.checkbox}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Experience </Text>
        <DropDownPicker
          items={[
            { label: 'Less than 3 months', value: 1.25 },
            { label: 'About 1 year', value: 1 },
            { label: '1 to 3 years', value: 2.5 },
            { label: '3 to 5 years', value: 4.5 },
            { label: '5 to 10 years', value: 7.5 },
            { label: 'More than 10 years', value: 15 }
          ]}
          defaultNull
          placeholder="Select workout experience"
          containerStyle={{ height: 50, width: '80%' }}
          dropDownMaxHeight={1500}
          // onChangeItem={item => console.log(item.label, item.value)}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Workout Goals/Parts </Text>
        <BeaconCheckBox
          option="chest"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="legs"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="shoulders"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="back"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="core"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="arm"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="others"
          state={bodyPart}
          setState={setBodyPart}
          containerStyle={styles.checkbox}
        />
      </View>


    </ScrollView >
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    // alignItems: 'center',
    // justifyContent: "center"
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    color: "#EF9C2E"
  },
  checkbox: {
    backgroundColor: "#fff"
  },
  
})