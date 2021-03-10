import React, { cloneElement, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from "react-native-elements";
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
import { rgba } from 'jimp';

export default function Beacon(props) {
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

  const [valueMS, setValueMS] = useState([]);
  const onChangeMS = (value) => {
    setValueMS(value);
  };

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

      <View style={styles.dropontainer}>
        <Text style={styles.title}> Experience </Text>
        <Dropdown
          label="Select workout experience"
          data={[
            { label: 'Less than 3 months', value: 1.25 },
            { label: 'About 1 year', value: 1 },
            { label: '1 to 3 years', value: 2.5 },
            { label: '3 to 5 years', value: 4.5 },
            { label: '5 to 10 years', value: 7.5 },
            { label: 'More than 10 years', value: 15 }
          ]}
          // enableSearch
          value={""}
          mainContainerStyle={styles.dropDown}
        // onChange={onChangeSS}
        />
        {/* <DropDownPicker
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
          containerStyle={{ height: 50, width: '80%', alignSelf: "center" }}
          style={{backgroundColor: "#fafafa"}}
          dropDownMaxHeight={1500}
          dropDownStyle={styles.dropDown}
        // onChangeItem={item => console.log(item.label, item.value)}
        /> */}
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Workout Goals/Parts </Text>
        <MultiselectDropdown
          label="Select workout parts/goals"
          data={[
            {
              value: '1',
              label: 'chest'
            },
            {
              value: '2',
              label: 'legs'
            },
            {
              value: '3',
              label: 'shoulders'
            },
            {
              value: '4',
              label: 'back'
            },
            {
              value: '5',
              label: 'core'
            },
            {
              value: '6',
              label: 'arms'
            },
            {
              value: '7',
              label: 'others'
            }
          ]}
          // enableSearch
          // enableAvatar
          chipType="outlined"
          value={valueMS}
          onChange={onChangeMS}
          mainContainerStyle={styles.dropDown}
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
    // alignItems: 'center',
    // justifyContent: "center"
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    color: "#EF9C2E"
  },
  dropDown: {
    width: '80%',
    marginHorizontal: '10%',
    // marginLeft: '7.5%',
    // marginRight: '7.5%',

  },
  checkbox: {
    // width: '80%',
    marginRight: '10%',
    marginLeft: '10%'
  }

})