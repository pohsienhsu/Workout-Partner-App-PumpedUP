import React, { cloneElement, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import BeaconCheckBox from "../components/beaconCheckBox "

import ModalDropdown from 'react-native-modal-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
// https://reactnativeexample.com/a-picker-dropdown-component-for-react-native/
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
// https://reactnativeexample.com/a-simple-and-customizable-react-native-dropdown-created-using-react-native-modal/


export default function Beacon(props) {
  const [gender, setGender] = useState({ Male: false, Female: false, Others: false });
  const [experience, setExperience] = useState([]);
  const [bodyPart, setBodyPart] = useState([]);

  bodyPart ? console.log(`Body Data: [${bodyPart}]`) : null;
  experience ? console.log(`Experience Data: [${experience}]`) : null;

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
        <Text style={styles.title}> Workout Goals/Parts </Text>
        <MultiselectDropdown
          label="Select workout parts/goals"
          data={bodyData}
          // enableSearch
          // enableAvatar
          chipType="outlined"
          value={bodyPart}
          onChange={setBodyPart}
          disableSort
          itemContainerStyle={{ height: 40 }}
          parentDDContainerStyle={{ height: "80%" }}

        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Experience </Text>
        <Dropdown
          label="Select workout experience"
          data={experienceData}
          // enableSearch
          value={experience}
          // mainContainerStyle={styles.dropDown}
          onChange={setExperience}
          parentDDContainerStyle={{ height: "80%" }}
        />
      </View>

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 0
  },
  container: {
    marginTop: 20,
    marginHorizontal: '10%'
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    color: "#EF9C2E"
  },
})

const bodyData = [
  { value: 'chest', label: 'chest' },
  { value: 'legs', label: 'legs' },
  { value: 'shoulders', label: 'shoulders' },
  { value: 'back', label: 'back' },
  { value: 'core', label: 'core' },
  { value: 'arms', label: 'arms' },
  { value: 'others', label: 'others' }
]

const experienceData = [
  { label: 'Less than 3 months', value: 1.25 },
  { label: 'About 1 year', value: 1 },
  { label: '1 to 3 years', value: 2.5 },
  { label: '3 to 5 years', value: 4.5 },
  { label: '5 to 10 years', value: 7.5 },
  { label: 'More than 10 years', value: 15 }
]